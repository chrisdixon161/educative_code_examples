// // https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/image-edge"],
	app: {
		pageTransition: { name: "custom", mode: "out-in" },
	},
});
