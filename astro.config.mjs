import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
	site: 'https://beta.2gether-asso.fr',
	integrations: [
		tailwind(),
		vue(),
	],
})
