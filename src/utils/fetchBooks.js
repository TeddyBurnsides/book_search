// fetch the google books API
const fetchBookData = async (searchCriteria, pageNumber) => {

	const searchValue=searchCriteria.value;
	const searchType=searchCriteria.type;
 
	if (searchValue == null) return; // don't need to fetch results if nothing was searched for
 
	const url = buildUrl(searchValue, searchType, pageNumber);
	let response = await fetch(url);
	let data = await response.json();
 
	return data;
}
 
// build the URL that will be used to send a query to the Google books API
const buildUrl = (searchValue, searchType, pageNumber) => {
 
	if (searchValue === undefined) return null; // can't search for nothing (should be stopped before this point, but safety check!)
	if (searchType === undefined) searchType = 'keyword'; // default search type to keyword
 
	searchValue=searchValue.replaceAll(' ','+'); // API wants pluses not spaces
	
	let url='https://www.googleapis.com/books/v1/volumes?q='
	if (searchType === 'keyword') url=url + searchValue;
	if (searchType === 'title') url=url + 'intitle:' + searchValue;
	if (searchType === 'author') url=url + 'inauthor:' + searchValue;
 
	const resultsPerPage=2;
	url=url+'&maxResults='+resultsPerPage;
	
	const index=(pageNumber-1)*resultsPerPage;
	if (pageNumber > 0) url=url+'&startIndex='+index;
 
	return url;
}

export default fetchBookData;