export const mockGeneratedDesign = {
	design: {
		objects: [
			{
				type: 'rect',
				left: 100,
				top: 100,
				width: 200,
				height: 100,
				fill: '#3B82F6',
				rx: 8,
				ry: 8,
			},
			{
				type: 'textbox',
				left: 150,
				top: 135,
				text: 'Button',
				fontSize: 16,
				fill: '#FFFFFF',
			},
		],
	},
	styles: {
		primary: '#3B82F6',
		secondary: '#10B981',
	},
	colorPalette: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
	metadata: {
		screenName: 'Login Form',
		description: 'A simple login form',
		components: ['button', 'input'],
	},
};

export const mockSimpleButton = {
	design: {
		objects: [
			{
				type: 'rect',
				left: 50,
				top: 50,
				width: 150,
				height: 50,
				fill: '#3B82F6',
				rx: 4,
				ry: 4,
			},
			{
				type: 'textbox',
				left: 80,
				top: 65,
				text: 'Click Me',
				fontSize: 14,
				fill: '#FFFFFF',
			},
		],
	},
	styles: {
		primary: '#3B82F6',
	},
	colorPalette: ['#3B82F6', '#FFFFFF'],
	metadata: {
		screenName: 'Button',
		description: 'A simple button',
		components: ['button'],
		platform: 'web',
	},
};

export const mockMobileButton = {
	design: {
		objects: [
			{
				type: 'rect',
				left: 30,
				top: 30,
				width: 120,
				height: 40,
				fill: '#3B82F6',
				rx: 4,
				ry: 4,
			},
		],
	},
	styles: {
		primary: '#3B82F6',
	},
	colorPalette: ['#3B82F6'],
	metadata: {
		screenName: 'Mobile Button',
		description: 'A mobile button',
		components: ['button'],
		platform: 'mobile',
	},
};
