export const useImageData = () => useState("image-data", () => []);
export const useDisplayImages = () => useState("display-images", () => []);
export const useNumberOfPages = () => useState("number-of-pages", () => 0);
export const useImagesPerPage = () => useState("images-per-page", () => 20);
export const useCurrentPageNumber = () => useState("current-page", () => 1);
export const useSafeSearch = () => useState("safe", () => true);

export const useAvailableColors = () =>
	useState("available-colors", () => [
		"grayscale",
		"transparent",
		"red",
		"orange",
		"yellow",
		"green",
		"turquoise",
		"blue",
		"lilac",
		"pink",
		"white",
		"gray",
		"black",
		"brown",
	]);
export const useSelectedColors = () => useState("selected-colors", () => []);
export const useIsEditorsChoice = () =>
	useState("is-editors-choice", () => false);
export const useFeaturedImage = () => useState("featured-image", () => "");
