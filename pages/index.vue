<script setup>
const { searchTerm, tags, selectedTag } = useSearch();
const { previousPage, nextPage } = usePagination();

const displayImages = useDisplayImages();
const numberOfPages = useNumberOfPages();
const currentPageNumber = useCurrentPageNumber();
const safeSearch = useSafeSearch();
const userInput = ref("");

function handleSearch() {
	searchTerm.value = userInput.value;
}
function handleTagClicked(tag) {
	// if selected tag is clicked again, clear tag so all images can be viewed
	if (selectedTag.value === tag) {
		selectedTag.value = "";
	} else {
		selectedTag.value = tag;
	}
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
		<label for="safe_search"><small>Safe search?</small></label
		><input type="checkbox" v-model="safeSearch" id="safe_search" />
		<section class="search_tags">
			<button
				v-for="tag in tags"
				:key="tag"
				@click="handleTagClicked(tag)"
				:style="{
					background: selectedTag === tag ? 'lightslategray' : 'transparent',
				}"
			>
				{{ tag }}
			</button>
		</section>
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
