export default function useSearch() {
	const displayImages = useDisplayImages();
	const imageData = useImageData();
	const numberOfPages = useNumberOfPages();
	const imagesPerPage = useImagesPerPage();
	const currentPageNumber = useCurrentPageNumber();

	const apiKey = "579835-d0622f0785ca94c156742fdca";
	const baseUrl = "https://pixabay.com/api/";

	const searchTerm = ref("");

	const { data: images } = useFetch(
		() =>
			`?key=${apiKey}&q=${searchTerm.value}&page=${currentPageNumber.value}&per_page=${imagesPerPage.value}`,
		{
			baseURL: baseUrl,
		}
	);

	function setImageData() {
		displayImages.value = [];
		imageData.value = images?.value?.hits;
		displayImages.value = images?.value?.hits;
		numberOfPages.value = Math.ceil(images?.value?.total / imagesPerPage.value); //
	}
	watch(images, setImageData);

	return { searchTerm };
}
