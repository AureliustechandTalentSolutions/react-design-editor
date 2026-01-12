/**
 * Screenshot Upload Component
 * Handles screenshot upload via drag-drop, file input, URL, and clipboard
 */

import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../components/icon/Icon';

import { processScreenshot } from '../../libs/ai/vision';
import type { ImageData } from '../../libs/ai/vision/types';

interface ScreenshotUploadProps {
	onImageProcessed: (imageData: ImageData) => void;
	onError?: (error: Error) => void;
	maxSize?: number;
	acceptedFormats?: string[];
}

/**
 * Screenshot Upload Component
 */
export const ScreenshotUpload: React.FC<ScreenshotUploadProps> = ({
	onImageProcessed,
	onError,
	maxSize = 5 * 1024 * 1024,
	acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [uploadMethod, setUploadMethod] = useState<'file' | 'url' | 'clipboard'>('file');
	const [urlInput, setUrlInput] = useState('');
	const [preview, setPreview] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const dropZoneRef = useRef<HTMLDivElement>(null);

	/**
	 * Handle file drop
	 */
	const handleDrop = useCallback(
		async (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			setIsDragging(false);
			setError(null);
			setSuccess(false);

			const files = Array.from(e.dataTransfer.files);
			const imageFile = files.find(file => acceptedFormats.includes(file.type));

			if (!imageFile) {
				setError('Please drop a valid image file');
				return;
			}

			await processFile(imageFile);
		},
		[acceptedFormats],
	);

	/**
	 * Handle drag over
	 */
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	/**
	 * Handle drag leave
	 */
	const handleDragLeave = () => {
		setIsDragging(false);
	};

	/**
	 * Handle file input change
	 */
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			await processFile(file);
		}
	};

	/**
	 * Process file
	 */
	const processFile = async (file: File) => {
		setError(null);
		setSuccess(false);
		setIsProcessing(true);

		try {
			// Validate file size
			if (file.size > maxSize) {
				throw new Error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
			}

			// Validate format
			if (!acceptedFormats.includes(file.type)) {
				throw new Error(`Format ${file.type} is not supported`);
			}

			// Create preview
			const previewUrl = URL.createObjectURL(file);
			setPreview(previewUrl);

			// Process image
			const imageData = await processScreenshot(file);
			onImageProcessed(imageData);
			setSuccess(true);
		} catch (err: any) {
			const errorMessage = err.message || 'Failed to process image';
			setError(errorMessage);
			if (onError) {
				onError(err);
			}
		} finally {
			setIsProcessing(false);
		}
	};

	/**
	 * Handle URL input
	 */
	const handleUrlSubmit = async () => {
		if (!urlInput.trim()) {
			setError('Please enter a URL');
			return;
		}

		setError(null);
		setSuccess(false);
		setIsProcessing(true);

		try {
			// Process from URL
			const imageData = await processScreenshot(urlInput);
			setPreview(`data:${imageData.format};base64,${imageData.base64}`);
			onImageProcessed(imageData);
			setSuccess(true);
		} catch (err: any) {
			const errorMessage = err.message || 'Failed to load image from URL';
			setError(errorMessage);
			if (onError) {
				onError(err);
			}
		} finally {
			setIsProcessing(false);
		}
	};

	/**
	 * Handle paste from clipboard
	 */
	const handlePaste = async () => {
		setError(null);
		setSuccess(false);

		try {
			const items = await navigator.clipboard.read();

			for (const item of items) {
				const imageType = item.types.find(type => type.startsWith('image/'));

				if (imageType) {
					setIsProcessing(true);
					const blob = await item.getType(imageType);
					await processFile(new File([blob], 'clipboard.png', { type: imageType }));
					return;
				}
			}

			setError('No image found in clipboard');
		} catch (err: any) {
			const errorMessage = err.message || 'Failed to paste from clipboard';
			setError(errorMessage);
			if (onError) {
				onError(err);
			}
		} finally {
			setIsProcessing(false);
		}
	};

	/**
	 * Clear preview
	 */
	const clearPreview = () => {
		if (preview && preview.startsWith('blob:')) {
			URL.revokeObjectURL(preview);
		}
		setPreview(null);
		setError(null);
		setSuccess(false);
		setUrlInput('');
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className="screenshot-upload">
			{/* Upload Method Tabs */}
			<div className="upload-tabs">
				<button
					type="button"
					className={`tab ${uploadMethod === 'file' ? 'active' : ''}`}
					onClick={() => setUploadMethod('file')}
				>
					<Icon name="upload" />
					<span>Upload File</span>
				</button>
				<button
					type="button"
					className={`tab ${uploadMethod === 'url' ? 'active' : ''}`}
					onClick={() => setUploadMethod('url')}
				>
					<Icon name="link" />
					<span>From URL</span>
				</button>
				<button
					type="button"
					className={`tab ${uploadMethod === 'clipboard' ? 'active' : ''}`}
					onClick={() => setUploadMethod('clipboard')}
				>
					<Icon name="clipboard" />
					<span>Paste</span>
				</button>
			</div>

			{/* Upload Area */}
			<div className="upload-content">
				{uploadMethod === 'file' && (
					<div
						ref={dropZoneRef}
						className={`drop-zone ${isDragging ? 'dragging' : ''} ${isProcessing ? 'processing' : ''}`}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onClick={() => fileInputRef.current?.click()}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								fileInputRef.current?.click();
							}
						}}
					>
						<input
							ref={fileInputRef}
							type="file"
							accept={acceptedFormats.join(',')}
							onChange={handleFileChange}
							style={{ display: 'none' }}
						/>
						<div className="drop-zone-content">
							<Icon name="image" size="3x" />
							<p className="primary-text">
								{isDragging ? 'Drop image here' : 'Drag & drop an image or click to browse'}
							</p>
							<p className="secondary-text">
								Supports: JPG, PNG, GIF, WebP (max {maxSize / 1024 / 1024}MB)
							</p>
						</div>
					</div>
				)}

				{uploadMethod === 'url' && (
					<div className="url-input-container">
						<input
							type="url"
							placeholder="Enter image URL..."
							value={urlInput}
							onChange={e => setUrlInput(e.target.value)}
							onKeyDown={e => e.key === 'Enter' && handleUrlSubmit()}
							disabled={isProcessing}
						/>
						<button
							type="button"
							onClick={handleUrlSubmit}
							disabled={!urlInput.trim() || isProcessing}
							className="btn-primary"
						>
							{isProcessing ? 'Loading...' : 'Load Image'}
						</button>
					</div>
				)}

				{uploadMethod === 'clipboard' && (
					<div className="clipboard-container">
						<button type="button" onClick={handlePaste} disabled={isProcessing} className="btn-clipboard">
							<Icon name="clipboard" size="3x" />
							<span>{isProcessing ? 'Processing...' : 'Paste from Clipboard'}</span>
						</button>
						<p className="hint">Copy an image to your clipboard and click the button above</p>
					</div>
				)}
			</div>

			{/* Preview */}
			{preview && (
				<div className="preview-container">
					<div className="preview-header">
						<h4>Preview</h4>
						<button type="button" onClick={clearPreview} className="btn-icon">
							<Icon name="times" />
						</button>
					</div>
					<div className="preview-image">
						<img src={preview} alt="Preview" />
					</div>
				</div>
			)}

			{/* Status Messages */}
			{error && (
				<div className="message error">
					<Icon name="exclamation-circle" />
					<span>{error}</span>
				</div>
			)}

			{success && (
				<div className="message success">
					<Icon name="check-circle" />
					<span>Image processed successfully</span>
				</div>
			)}

			{isProcessing && (
				<div className="processing-indicator">
					<div className="spinner" />
					<span>Processing image...</span>
				</div>
			)}
		</div>
	);
};

export default ScreenshotUpload;
