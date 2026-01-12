export const USWDSTokens = {
	colors: {
		primary: {
			base: '#005ea2',
			dark: '#1a4480',
			darker: '#162e51',
			light: '#73b3e7',
			lighter: '#d9e8f6',
			vivid: '#0050d8',
		},
		secondary: {
			base: '#d83933',
			dark: '#b50909',
			darker: '#8b0a03',
			light: '#f2938c',
			lighter: '#f8dfe2',
			vivid: '#e41d3d',
		},
		accent: {
			cool: {
				base: '#00bde3',
				dark: '#28a0cb',
				darker: '#07648d',
				light: '#97d4ea',
				lighter: '#e1f3f8',
			},
			warm: {
				base: '#fa9441',
				dark: '#c05600',
				darker: '#775540',
				light: '#ffbc78',
				lighter: '#f2e4d4',
			},
		},
		base: {
			lightest: '#f0f0f0',
			lighter: '#dfe1e2',
			light: '#a9aeb1',
			base: '#71767a',
			dark: '#565c65',
			darker: '#3d4551',
			darkest: '#1b1b1b',
		},
		status: {
			success: '#00a91c',
			successDark: '#4d8055',
			successLight: '#ecf3ec',
			warning: '#ffbe2e',
			warningDark: '#e5a000',
			warningLight: '#faf3d1',
			error: '#d54309',
			errorDark: '#b50909',
			errorLight: '#f4e3db',
			info: '#00bde3',
			infoDark: '#009ec1',
			infoLight: '#e7f6f8',
		},
		white: '#ffffff',
		black: '#000000',
		ink: '#1b1b1b',
	},
	spacing: {
		'0': '0',
		'05': '0.25rem', // 4px
		'1': '0.5rem', // 8px
		'105': '0.75rem', // 12px
		'2': '1rem', // 16px
		'205': '1.25rem', // 20px
		'3': '1.5rem', // 24px
		'4': '2rem', // 32px
		'5': '2.5rem', // 40px
		'6': '3rem', // 48px
		'7': '3.5rem', // 56px
		'8': '4rem', // 64px
		'9': '4.5rem', // 72px
		'10': '5rem', // 80px
		'15': '7.5rem', // 120px
	},
	typography: {
		fontFamily: {
			sans:
				'"Public Sans Web", -apple-system, BlinkMacSystemFont, ' +
				'"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
			serif: '"Merriweather Web", Georgia, Cambria, "Times New Roman", Times, serif',
			mono: '"Roboto Mono Web", "Bitstream Vera Sans Mono", Consolas, Courier, monospace',
		},
		fontSize: {
			'3xs': '0.87rem',
			'2xs': '0.93rem',
			xs: '1rem',
			sm: '1.06rem',
			md: '1.13rem',
			lg: '1.33rem',
			xl: '1.73rem',
			'2xl': '2.13rem',
			'3xl': '2.66rem',
		},
		lineHeight: {
			'1': 1,
			'2': 1.15,
			'3': 1.35,
			'4': 1.5,
			'5': 1.62,
			'6': 1.75,
		},
	},
	borderRadius: {
		'0': '0',
		sm: '0.125rem', // 2px
		md: '0.25rem', // 4px
		lg: '0.5rem', // 8px
		pill: '99rem',
	},
	shadows: {
		'1': '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
		'2': '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
		'3': '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
		'4': '0 12px 24px 0 rgba(0, 0, 0, 0.1)',
		'5': '0 16px 32px 0 rgba(0, 0, 0, 0.1)',
	},
};

export type USWDSColorKey = keyof typeof USWDSTokens.colors;
export type USWDSSpacingKey = keyof typeof USWDSTokens.spacing;
