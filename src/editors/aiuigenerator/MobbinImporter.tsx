/**
 * MobbinImporter Component
 * Screenshot upload UI with drag-drop and clipboard paste
 */

import { Upload, AlertCircle, CheckCircle } from '@flomon-ui/icons';
import React, { useState, useCallback, useRef, useEffect } from 'react';

import { ConversionOptions, ConversionResult } from '../../libs/screenshot-to-code';
import { importFromFile, importFromClipboard, batchImport } from '../../libs/screenshot-to-code/mobbin';

interface MobbinImporterProps {
	onImportComplete: (result: ConversionResult) => void;
	onBatchImportComplete?: (results: ConversionResult[]) => void;
	options: ConversionOptions;
}

// eslint-disable-next-line import/prefer-default-export
export function MobbinImporter({ onImportComplete, onBatchImportComplete, options }: MobbinImporterProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Handle file drop
	const handleDrop = useCallback(
		async (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			setIsDragging(false);
			setError(null);
			setSuccess(null);

			const { files } = e.dataTransfer;
			if (files.length === 0) return;

			setIsProcessing(true);

			try {
				if (files.length === 1) {
					// Single file import
					const result = await importFromFile(files[0], options);
					onImportComplete(result);
					setSuccess('Screenshot imported successfully!');
				} else {
					// Batch import
					const fileArray = Array.from(files);
					const batchResult = await batchImport(fileArray, options);

					if (onBatchImportComplete) {
						const successfulResults = batchResult.results
							.filter(r => r.result)
							.map(r => r.result as ConversionResult);
						onBatchImportComplete(successfulResults);
					}

					setSuccess(`Imported ${batchResult.successful} of ${batchResult.total} screenshots`);

					if (batchResult.failed > 0) {
						setError(`${batchResult.failed} screenshots failed to import`);
					}
				}
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
				setError(errorMessage);
			} finally {
				setIsProcessing(false);
			}
		},
		[options, onImportComplete, onBatchImportComplete],
	);

	// Handle file input change
	const handleFileChange = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const { files } = e.target;
			if (!files || files.length === 0) return;

			setIsProcessing(true);
			setError(null);
			setSuccess(null);

			try {
				if (files.length === 1) {
					const result = await importFromFile(files[0], options);
					onImportComplete(result);
					setSuccess('Screenshot imported successfully!');
				} else {
					const fileArray = Array.from(files);
					const batchResult = await batchImport(fileArray, options);

					if (onBatchImportComplete) {
						const successfulResults = batchResult.results
							.filter(r => r.result)
							.map(r => r.result as ConversionResult);
						onBatchImportComplete(successfulResults);
					}

					setSuccess(`Imported ${batchResult.successful} of ${batchResult.total} screenshots`);

					if (batchResult.failed > 0) {
						setError(`${batchResult.failed} screenshots failed to import`);
					}
				}
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
				setError(errorMessage);
			} finally {
				setIsProcessing(false);
			}

			// Reset file input
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		},
		[options, onImportComplete, onBatchImportComplete],
	);

	// Handle clipboard paste
	const handlePaste = useCallback(
		async (e: ClipboardEvent) => {
			if (!e.clipboardData) return;

			// Check if we have an image in the clipboard
			const { items } = e.clipboardData;
			let hasImage = false;

			for (let i = 0; i < items.length; i += 1) {
				if (items[i].type.indexOf('image') !== -1) {
					hasImage = true;
					break;
				}
			}

			if (!hasImage) return;

			e.preventDefault();
			setIsProcessing(true);
			setError(null);
			setSuccess(null);

			try {
				const result = await importFromClipboard(e.clipboardData, options);
				onImportComplete(result);
				setSuccess('Screenshot pasted successfully!');
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
				setError(errorMessage);
			} finally {
				setIsProcessing(false);
			}
		},
		[options, onImportComplete],
	);

	// Add paste event listener
	useEffect(() => {
		window.addEventListener('paste', handlePaste);
		return () => {
			window.removeEventListener('paste', handlePaste);
		};
	}, [handlePaste]);

	return (
		<div style={{ width: '100%', padding: '20px' }}>
			<div
				role="button"
				tabIndex={0}
				onDrop={handleDrop}
				onDragOver={e => {
					e.preventDefault();
					setIsDragging(true);
				}}
				onDragLeave={() => setIsDragging(false)}
				onClick={() => fileInputRef.current?.click()}
				onKeyDown={e => {
					if (e.key === 'Enter' || e.key === ' ') {
						fileInputRef.current?.click();
					}
				}}
				style={{
					border: `2px dashed ${isDragging ? '#3b82f6' : '#d1d5db'}`,
					borderRadius: '8px',
					padding: '40px',
					textAlign: 'center',
					cursor: isProcessing ? 'wait' : 'pointer',
					backgroundColor: isDragging ? '#eff6ff' : '#ffffff',
					transition: 'all 0.2s',
				}}
			>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/png,image/jpeg,image/jpg,image/webp"
					multiple
					onChange={handleFileChange}
					style={{ display: 'none' }}
				/>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '12px',
					}}
				>
					{isProcessing ? (
						<>
							<div
								style={{
									width: '48px',
									height: '48px',
									borderRadius: '50%',
									border: '4px solid #e5e7eb',
									borderTopColor: '#3b82f6',
									animation: 'spin 1s linear infinite',
								}}
							/>
							<p style={{ color: '#6b7280', fontSize: '14px' }}>Processing screenshots...</p>
						</>
					) : (
						<>
							<div style={{ fontSize: '48px', color: '#9ca3af' }}>
								<Upload />
							</div>
							<div>
								<p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
									Drop screenshots here or click to upload
								</p>
								<p style={{ fontSize: '14px', color: '#6b7280' }}>
									Supports PNG, JPG, WebP • Single or multiple files • Cmd+V to paste
								</p>
							</div>
						</>
					)}
				</div>
			</div>

			{/* Success message */}
			{success && (
				<div
					style={{
						marginTop: '16px',
						padding: '12px 16px',
						backgroundColor: '#ecfdf5',
						border: '1px solid #86efac',
						borderRadius: '6px',
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
					}}
				>
					<CheckCircle style={{ color: '#10b981', flexShrink: 0 }} />
					<span style={{ color: '#065f46', fontSize: '14px' }}>{success}</span>
				</div>
			)}

			{/* Error message */}
			{error && (
				<div
					style={{
						marginTop: '16px',
						padding: '12px 16px',
						backgroundColor: '#fef2f2',
						border: '1px solid #fca5a5',
						borderRadius: '6px',
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
					}}
				>
					<AlertCircle style={{ color: '#dc2626', flexShrink: 0 }} />
					<span style={{ color: '#991b1b', fontSize: '14px' }}>{error}</span>
				</div>
			)}

			<style>
				{`
					@keyframes spin {
						from {
							transform: rotate(0deg);
						}
						to {
							transform: rotate(360deg);
						}
					}
				`}
			</style>
		</div>
	);
}
