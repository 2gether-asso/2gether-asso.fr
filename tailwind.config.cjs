const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				"theme-0": "var(--color-theme-0)",
				"theme-50": "var(--color-theme-50)",
				"theme-100": "var(--color-theme-100)",
				"theme-200": "var(--color-theme-200)",
				"theme-300": "var(--color-theme-300)",
				"theme-400": "var(--color-theme-400)",
				"theme-500": "var(--color-theme-500)",
				"theme-600": "var(--color-theme-600)",
				"theme-700": "var(--color-theme-700)",
				"theme-800": "var(--color-theme-800)",
				"theme-900": "var(--color-theme-900)",
				"theme-950": "var(--color-theme-950)",
				"theme-1000": "var(--color-theme-1000)",
			},
			textColor: {
				default: 'var(--color-text)',
				offset: 'var(--color-text-offset)',
			},
			backgroundColor: {
				default: 'var(--color-background)',
				offset: 'var(--color-background-offset)',
				"gradiant-top": "var(--color-background-gradient-top)",
				"gradiant-bottom": "var(--color-background-gradient-bottom)",
			},
			borderColor: {
				default: 'var(--color-border)',
			},
		},
	},
	corePlugins: {
		fontSize: false,
	},
	plugins: [
		require('tailwindcss-fluid-type'),
	],
}
