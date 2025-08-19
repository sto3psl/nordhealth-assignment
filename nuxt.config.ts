// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// Nord components don't support SSR
	// https://nordhealth.design/web-components/#server-side-rendering-(ssr)-with-vue
	ssr: false,
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["@nuxt/eslint", "@nuxt/test-utils"],
	css: ["~/assets/css/main.css"],
	vue: {
		compilerOptions: {
			// tell Vue that all components starting with `nord-` are web components from Nord Design System
			isCustomElement: (tag) => tag.startsWith("nord-"),
		},
	},
	nitro: {
		storage: {
			memoryDB: {
				driver: "fs",
				base: "./data/db",
			},
		},
	},
})
