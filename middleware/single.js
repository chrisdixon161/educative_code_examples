const selectedImage = useSelectedImage();
export default defineNuxtRouteMiddleware((to, from) => {
	// protect single page from error when no image selected (on page refresh)
	if (to.path === "/single" && !selectedImage.value) {
		return navigateTo("/");
	}
});
