<script setup>
// middleware to check if image is selected- if not error on refresh
definePageMeta({
	middleware: "single",
});
const selectedImage = useSelectedImage();

async function handleDownload() {
	try {
		const url = selectedImage.value.largeImageURL;
		const res = await fetch(url);
		const file = await res.blob();
		let objUrl = URL.createObjectURL(file);
		const element = document.createElement("a");
		element.href = objUrl;
		element.download = "image";
		document.body.appendChild(element);
		element.click();
		URL.revokeObjectURL(objUrl);
		element.remove();
	} catch (err) {
		alert("There was an error, please try again...");
	}
}
</script>

<template>
	<div>
		<nuxt-img
			:src="selectedImage.largeImageURL"
			:alt="`image by ${selectedImage.user}`"
			format="webp"
		/>
		<p>By: {{ selectedImage.user }}</p>
		<p>Tags: {{ selectedImage.tags }}</p>
		<button @click="handleDownload">download image</button>
	</div>
</template>
