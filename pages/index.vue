<script setup>
const { searchTerm, tags, selectedTag } = useSearch();
const { previousPage, nextPage } = usePagination();

const displayImages = useDisplayImages();
const numberOfPages = useNumberOfPages();
const currentPageNumber = useCurrentPageNumber();
const safeSearch = useSafeSearch();
const userInput = ref("");

const featuredImage = useFeaturedImage();
const isEditorsChoice = useIsEditorsChoice();

function handleSearch() {
	isEditorsChoice.value = false;
	searchTerm.value = userInput.value;
}
function handleTagClicked(tag) {
	if (selectedTag.value === tag) {
		selectedTag.value = "";
	} else {
		selectedTag.value = tag;
	}
}

const modalOpen = ref(false);
const modalImage = ref({});

function openModal(image) {
	modalOpen.value = true;
	modalImage.value = image;
}
function closeModal() {
	modalOpen.value = false;
}
</script>
<template>
	<Modal :modalImage="modalImage" @close-modal="closeModal" v-if="modalOpen" />
	<header
		class="search_header"
		:style="{
			backgroundImage: `url(${featuredImage})`,
			height: '50vh',
			backgroundPosition: 'center',
			maxWidth: '100%',
			backgroundRepeat: 'no-repeat',
		}"
	>
		<input
			class="search"
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
	<section class="options_wrapper">
		<div class="menu_options">
			<ImagesPerPage />
			<ColorOptions />
		</div>
		<div class="pixabay_credit">
			<span>Images by: </span>
			<img
				class="pixabay_credit_image"
				src="images/logo.svg"
				alt="pixabay logo"
			/>
		</div>
	</section>
	<ul class="images">
		<li v-for="image in displayImages" :key="image.id">
			<img
				class="img_preview"
				:src="image.webformatURL"
				@click="openModal(image)"
			/>
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

<style>
.search_header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.search {
	margin: 1rem;
	padding: 10px;
	border-radius: 5px;
	width: 50%;
}
.search_tags {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}
.options_wrapper {
	display: flex;
	align-items: center;
	margin: 1rem 0;
}

.menu_options {
	display: flex;
}

.pixabay_credit {
	display: flex;
	justify-content: flex-end;
}

.pixabay_credit_image {
	max-width: 15%;
	margin-left: 10px;
}

.images {
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}

ul {
	padding: 0;
	margin: 0;
}

li {
	list-style: none;
	margin: 10px;
}

.img_preview {
	max-height: 200px;
	cursor: pointer;
}
button {
	border: 1px lightslategray solid;
	background: none;
	margin: 5px 2px;
	border-radius: 3px;
	cursor: pointer;
}
</style>
