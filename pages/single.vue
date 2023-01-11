<script setup>
// middleware to check if image is selected- if not error on refresh
definePageMeta({
	middleware: "single",
});
const selectedImage = useSelectedImage();
</script>

<template>
	<div>
		<img
			:src="selectedImage.largeImageURL"
			:alt="`image by ${selectedImage.user}`"
		/>
		<p>By: {{ selectedImage.user }}</p>
		<p>Tags: {{ selectedImage.tags }}</p>
	</div>
</template>
