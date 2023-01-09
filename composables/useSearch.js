export default function useSearch() {
	const displayImages = useDisplayImages();
	const imageData = useImageData();
	const numberOfPages = useNumberOfPages();
	const imagesPerPage = useImagesPerPage();
	const currentPageNumber = useCurrentPageNumber();
	const safeSearch = useSafeSearch();
	const selectedColors = useSelectedColors();
	const formattedColors = computed(function () {
		return selectedColors.value.toString();
	});

	const apiKey = "579835-d0622f0785ca94c156742fdca";
	const baseUrl = "https://pixabay.com/api/";

	const searchTerm = ref("");
	const tags = new Set();
	const selectedTag = ref("");

	const { data: images } = useFetch(
		() =>
			`?key=${apiKey}&q=${searchTerm.value}&page=${currentPageNumber.value}&per_page=${imagesPerPage.value}&safesearch=${safeSearch.value}&colors=${formattedColors.value}`,
		{
			baseURL: baseUrl,
		}
	);

	function setImageData() {
		displayImages.value = [];
		imageData.value = images?.value?.hits;
		displayImages.value = images?.value?.hits;
		numberOfPages.value = Math.ceil(images?.value?.total / imagesPerPage.value);
		createTags();
	}
	watch(images, setImageData);

	function createTags() {
		tags.clear();
		if (displayImages.value.length > 0) {
			displayImages.value.forEach((element) => {
				const arr = element.tags.split(", ");
				arr.forEach(function (tag) {
					tags.add(tag);
				});
			});
		}
	}

	function filterImagesByTag() {
		displayImages.value = imageData.value.filter(function (image) {
			return image.tags.includes(selectedTag.value);
		});
	}
	watch(selectedTag, filterImagesByTag);

	return { searchTerm, tags, selectedTag };
}
