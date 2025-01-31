// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: false },
	css: ["~/assets/styles/main.css"],
	router: {
		options: {
			scrollBehaviorType: "smooth",
		},
	},
	modules: ["@nuxt/ui", "@pinia/nuxt"],
	pinia: {
		storesDirs: ["./stores/**"],
	},
	colorMode: {
		preference: "light",
	},
});
