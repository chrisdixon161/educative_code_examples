export default function useSearch() {
	const displayImages = useDisplayImages();
	const imageData = useImageData();

	const apiKey = "579835-d0622f0785ca94c156742fdca";
	const baseUrl = "https://pixabay.com/api/";

	const searchTerm = ref("");

	const { data: images } = useFetch(
		() => `?key=${apiKey}&q=${searchTerm.value}`,
		{
			baseURL: baseUrl,
		}
	);

	function setImageData() {
		displayImages.value = [];
		imageData.value = images?.value?.hits;
		displayImages.value = images?.value?.hits;
	}
	watch(images, setImageData);

	return { searchTerm };
}
