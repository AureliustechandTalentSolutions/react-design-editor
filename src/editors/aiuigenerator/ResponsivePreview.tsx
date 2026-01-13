/**
 * ResponsivePreview Component
 * Device viewport switcher with realistic device frames
 */

import {
	MobileOutlined,
	TabletOutlined,
	DesktopOutlined,
	RotateLeftOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Select, InputNumber, Radio, Tooltip } from 'antd';
import React, { useState, useMemo } from 'react';

import { STANDARD_VIEWPORTS, DEVICE_PRESETS, Viewport, getViewportById } from '../../libs/responsive/viewports';

const { Option } = Select;

/**
 * Props for ResponsivePreview component
 */
export interface ResponsivePreviewProps {
	children: React.ReactNode;
	defaultViewport?: string;
	showToolbar?: boolean;
	showDeviceFrame?: boolean;
	onViewportChange?: (viewport: Viewport) => void;
}

/**
 * Orientation type
 */
type Orientation = 'portrait' | 'landscape';

/**
 * ResponsivePreview Component
 */
export const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({
	children,
	defaultViewport = 'desktop',
	showToolbar = true,
	showDeviceFrame = true,
	onViewportChange,
}) => {
	const [selectedViewportId, setSelectedViewportId] = useState(defaultViewport);
	const [orientation, setOrientation] = useState<Orientation>('portrait');
	const [zoom, setZoom] = useState(1);
	const [customWidth, setCustomWidth] = useState<number | null>(null);
	const [customHeight, setCustomHeight] = useState<number | null>(null);
	const [useCustom, setUseCustom] = useState(false);

	const currentViewport = useMemo(() => {
		if (useCustom && customWidth && customHeight) {
			return {
				id: 'custom',
				name: 'Custom',
				width: customWidth,
				height: customHeight,
				icon: '⚙️',
				category: 'desktop' as const,
			};
		}
		return getViewportById(selectedViewportId) || STANDARD_VIEWPORTS[0];
	}, [selectedViewportId, useCustom, customWidth, customHeight]);

	const displayWidth = orientation === 'portrait' ? currentViewport.width : currentViewport.height;
	const displayHeight = orientation === 'portrait' ? currentViewport.height : currentViewport.width;

	const handleViewportChange = (viewportId: string) => {
		setSelectedViewportId(viewportId);
		setUseCustom(false);
		const viewport = getViewportById(viewportId);
		if (viewport && onViewportChange) {
			onViewportChange(viewport);
		}
	};

	const handleOrientationToggle = () => {
		setOrientation(prev => (prev === 'portrait' ? 'landscape' : 'portrait'));
	};

	const handleZoomIn = () => {
		setZoom(prev => Math.min(prev + 0.1, 2));
	};

	const handleZoomOut = () => {
		setZoom(prev => Math.max(prev - 0.1, 0.5));
	};

	const handleCustomSize = () => {
		if (!customWidth || !customHeight) {
			setCustomWidth(currentViewport.width);
			setCustomHeight(currentViewport.height);
		}
		setUseCustom(true);
	};

	const deviceFrameStyles: React.CSSProperties = showDeviceFrame
		? {
				padding: '40px 20px',
				background: '#1a1a1a',
				borderRadius: '30px',
				boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
				position: 'relative',
			}
		: {};

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			{showToolbar && (
				<div
					style={{
						padding: '16px',
						background: '#f5f5f5',
						borderBottom: '1px solid #d9d9d9',
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
						flexWrap: 'wrap',
					}}
				>
					{/* Viewport Selector */}
					<Select
						value={useCustom ? 'custom' : selectedViewportId}
						onChange={handleViewportChange}
						style={{ width: 200 }}
						placeholder="Select viewport"
					>
						<Option value="mobile">
							<MobileOutlined /> Mobile (375x667)
						</Option>
						<Option value="tablet">
							<TabletOutlined /> Tablet (768x1024)
						</Option>
						<Option value="desktop">
							<DesktopOutlined /> Desktop (1440x900)
						</Option>
						<Option value="wide">🖥️ Wide (1920x1080)</Option>
						<Select.OptGroup label="Device Presets">
							{DEVICE_PRESETS.map(device => (
								<Option key={device.id} value={device.id}>
									{device.icon} {device.name} ({device.width}x{device.height})
								</Option>
							))}
						</Select.OptGroup>
					</Select>

					{/* Orientation Toggle */}
					<Tooltip title="Toggle Orientation">
						<Button icon={<RotateLeftOutlined />} onClick={handleOrientationToggle}>
							{orientation === 'portrait' ? 'Portrait' : 'Landscape'}
						</Button>
					</Tooltip>

					{/* Zoom Controls */}
					<div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
						<Tooltip title="Zoom Out">
							<Button icon={<ZoomOutOutlined />} onClick={handleZoomOut} disabled={zoom <= 0.5} />
						</Tooltip>
						<span style={{ minWidth: '60px', textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
						<Tooltip title="Zoom In">
							<Button icon={<ZoomInOutlined />} onClick={handleZoomIn} disabled={zoom >= 2} />
						</Tooltip>
					</div>

					{/* Custom Size */}
					<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
						<InputNumber
							placeholder="Width"
							value={customWidth || undefined}
							onChange={value => setCustomWidth(value)}
							min={320}
							max={3840}
							style={{ width: 100 }}
						/>
						<span>×</span>
						<InputNumber
							placeholder="Height"
							value={customHeight || undefined}
							onChange={value => setCustomHeight(value)}
							min={320}
							max={2160}
							style={{ width: 100 }}
						/>
						<Button onClick={handleCustomSize} disabled={!customWidth || !customHeight}>
							Apply Custom
						</Button>
					</div>

					{/* Scale to Fit */}
					<Radio.Group value={zoom === 1 ? 'fit' : 'custom'} onChange={e => setZoom(1)}>
						<Radio.Button value="fit">Fit to Screen</Radio.Button>
					</Radio.Group>

					{/* Current Dimensions Display */}
					<div style={{ marginLeft: 'auto', color: '#666', fontSize: '14px' }}>
						{displayWidth} × {displayHeight}px
					</div>
				</div>
			)}

			{/* Preview Container */}
			<div
				style={{
					flex: 1,
					overflow: 'auto',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: '#e8e8e8',
					padding: '40px',
				}}
			>
				<div style={{ ...deviceFrameStyles, transform: `scale(${zoom})`, transformOrigin: 'center' }}>
					{showDeviceFrame && (
						<>
							{/* Device Camera Notch */}
							<div
								style={{
									position: 'absolute',
									top: '10px',
									left: '50%',
									transform: 'translateX(-50%)',
									width: '120px',
									height: '25px',
									background: '#0a0a0a',
									borderRadius: '0 0 15px 15px',
								}}
							/>
						</>
					)}

					{/* Content Frame */}
					<div
						style={{
							width: displayWidth,
							height: displayHeight,
							background: 'white',
							borderRadius: showDeviceFrame ? '8px' : '0',
							overflow: 'auto',
							boxShadow: showDeviceFrame ? 'inset 0 0 10px rgba(0, 0, 0, 0.1)' : 'none',
						}}
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResponsivePreview;
