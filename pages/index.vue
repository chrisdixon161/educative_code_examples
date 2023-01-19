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
	<div>
		<Modal
			:modalImage="modalImage"
			@close-modal="closeModal"
			v-if="modalOpen"
		/>
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
			<div>
				<input
					class="search"
					type="text"
					v-model="userInput"
					@keyup.enter="handleSearch"
					placeholder="Search for an image"
				/>
				<label for="safe_search"><small>Safe search?</small></label
				><input type="checkbox" v-model="safeSearch" id="safe_search" />
			</div>
			<section class="search_tags">
				<button
					v-for="tag in tags"
					:key="tag"
					@click="handleTagClicked(tag)"
					:style="{
						background: selectedTag === tag ? 'lightslategray' : '#ededed',
					}"
				>
					{{ tag }}
				</button>
			</section>
		</header>
		<section class="options_wrapper">
			<div class="pixabay_credit">
				<span>Images by: </span>
				<img
					class="pixabay_credit_image"
					src="images/logo.svg"
					alt="pixabay logo"
				/>
			</div>
			<ImagesPerPage />
			<ColorOptions />
		</section>
		<ul class="images">
			<li v-for="image in displayImages" :key="image.id">
				<nuxt-img
					class="img_preview"
					:src="image.webformatURL"
					@click="openModal(image)"
					format="webp"
					loading="lazy"
					height="200"
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
	</div>
</template>

<style>
.search_header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
}
.search {
	margin: 1rem;
	padding: 10px;
	border-radius: 5px;
	width: 50vw;
}
.search_tags {
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	width: 50vw;
}
.options_wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
}

.pixabay_credit {
	display: flex;
	justify-content: center;
	align-items: center;
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
	cursor: pointer;
}

button {
	border: none;
	margin: 5px 2px;
	border-radius: 3px;
	cursor: pointer;
}
</style>
