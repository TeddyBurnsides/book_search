import { useEffect, useState } from "react";
import Book from './Book';

const BookList = (props) => {

	// state values
	const [error, setError] = useState(false); // search error has occured
	const [hasInitSearch,setHasInitSearch] = useState(false); // user has kicked off a search already
	const [loading,setLoading] = useState(false); // results are loading
	const [books, setBooks] = useState([]); // contains data returned from API

	// fetch the google books API
	const getBooks = async (searchValue, searchType) => {
		const url = buildUrl(searchValue, searchType);
		console.log(url)
		let response = await fetch(url);
		let data = await response.json();
		return data;
	}

	const buildUrl = (searchValue, searchType) => {

		if (searchValue === undefined) return null; // can't search for nothing (should be stopped before this point, but safety check!)
		if (searchType === undefined) searchType = 'keyword'; // default search type to keyword

		searchValue=searchValue.replaceAll(' ','+'); // API wants pluses not spaces
		
		let url='https://www.googleapis.com/books/v1/volumes?q='
		if (searchType === 'keyword') url=url + searchValue;
		if (searchType === 'title') url=url + 'intitle:' + searchValue;
		if (searchType === 'author') url=url + 'inauthor:' + searchValue;

		return url;
	}

	// given the book's API response, build an object with the relevant info
	const buildBookObject = (bookInfo) => {

		// avoid undefined property assignment
		const title = (bookInfo.volumeInfo?.title === undefined) ? '' : bookInfo.volumeInfo?.title;
		const authors = (bookInfo.volumeInfo?.authors === undefined) ? '' : bookInfo.volumeInfo?.authors.join(', ');
		const imageUrl = (bookInfo.volumeInfo?.imageLinks?.smallThumbnail === undefined) ? '' : bookInfo.volumeInfo?.imageLinks?.smallThumbnail;
		const infoUrl = (bookInfo.volumeInfo?.infoLink === undefined) ? '' : bookInfo.volumeInfo?.infoLink;

		return {title:title, author:authors, imageUrl:imageUrl, infoUrl:infoUrl}
	}

	useEffect(() => {

		if (props.searchValue !== '') {

			setLoading(true); // results are likely loading
			setHasInitSearch(true); // we have started a search

			let newBooks = [];
			getBooks(props.searchValue, props.searchType).then(response => {
				if (response?.items === undefined) { // need a valid response to continue
					setError(true); // notify user we're in an error state
				} else {
					setError(false); // reset error state if it's been set previously
					// add data from response into our array of book objects
					for (var i = 0; i < response.items.length; i++) {
						newBooks.push(buildBookObject(response.items[i]));
					}
					setBooks(newBooks); // set state with newly acquired book data
					//console.log(addNewBook('theo'))
					setLoading(false); // we've finished loading data
				}
			});
		}	
	},[props.searchValue, props.searchType]); // want component to re-render when a new search value is entered

	if (error) { // set when fetch fails to return any data
		return (
			<p className="message">No results found</p>
		)
	} else if (loading) { // set between when a non-zero length search term is entered, and results are set into state
		return (
			<p className="message">Loading...</p>
		)
	} else if (hasInitSearch === false) { // if we haven't attempted a search yet, don't display anything
		return (
			<p className="message"></p>
		)
	} else { // at this point we have valid data to display, so display it

		const bookArray = books.map((book,index) => <Book key={index} book={book} /> );

		return (
			<div className="bookList">
				<h2>Books Found:</h2>
				<ul>{bookArray}</ul>
			</div>
			
		)
	}
	
	
}

export default BookList;