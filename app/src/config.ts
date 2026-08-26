import type { AstroConfig } from 'astro'

import fr from './i18n/locales/fr'
// import en from './i18n/locales/en'

export interface LocaleKeys
{
	[key: string]: LocaleKeys | string
}

export type LocalesKeys = Record<string, LocaleKeys>

export type I18nConfig = AstroConfig['i18n'] & { localeKeys?: LocalesKeys }

export const i18nLocales = [
	{
		codes: ['fr', 'fr_FR'],
		path: 'fr',
	},
	// {
	// 	codes: ['en', 'en_US'],
	// 	path: 'en',
	// },
] as const satisfies I18nConfig['locales']

export const i18nDefaultLocale = i18nLocales[0].path

export const i18n = {
	locales: i18nLocales,
	defaultLocale: i18nDefaultLocale,
	fallback: {
		// en: 'fr',
	},
	localeKeys: {
		fr,
		// en,
	},
	routing: {
		prefixDefaultLocale: false,
		redirectToDefaultLocale: false,
		fallbackType: 'rewrite',
	},
} as const satisfies I18nConfig
