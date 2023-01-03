<script setup>
const { searchTerm } = useSearch();
const displayImages = useDisplayImages();
const userInput = ref("");
function handleSearch() {
	searchTerm.value = userInput.value;
}
</script>
<template>
	<header class="search_header">
		<input
			type="text"
			v-model="userInput"
			@keyup.enter="handleSearch"
			placeholder="Search for an image"
		/>
	</header>
	<ul class="images">
		<li v-for="image in displayImages" :key="image.id">
			<img class="img_preview" :src="image.webformatURL" />
		</li>
	</ul>
</template>
