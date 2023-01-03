<script setup>
const { searchTerm } = useSearch();
const { previousPage, nextPage } = usePagination();

const displayImages = useDisplayImages();

const numberOfPages = useNumberOfPages();
const currentPageNumber = useCurrentPageNumber();

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
	<footer v-if="displayImages.length > 0">
		<button v-if="currentPageNumber > 1" @click="previousPage">
			Previous page
		</button>
		<button v-if="currentPageNumber < numberOfPages" @click="nextPage">
			Next page
		</button>
		<p>page {{ currentPageNumber }} of {{ numberOfPages }}</p>
	</footer>
</template>
