export default function usePagination() {
	const numberOfPages = useNumberOfPages();
	const currentPageNumber = useCurrentPageNumber();

	function previousPage() {
		if (currentPageNumber.value === 1) return;
		currentPageNumber.value--;
	}
	function nextPage() {
		if (currentPageNumber.value >= numberOfPages.value) return;
		currentPageNumber.value++;
	}
	return { previousPage, nextPage };
}
