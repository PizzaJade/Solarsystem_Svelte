const URL =
	"https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Pet_door&formatversion=2&origin=*";

function generateURL(searchValue) {
	return `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${searchValue.replace(
		/\s/g,
		"_"
	)}&formatversion=2&origin=*`;
}

export { URL, generateURL };
