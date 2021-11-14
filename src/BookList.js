import { useEffect, useState } from "react";

const BookList = (props) => {

	const [error, setError] = useState(false); // search error has occured
	const [hasInitSearch,setHasInitSearch] = useState(false); // user has kicked off a search already
	const [loading,setLoading] = useState(false); // results are loading
	const [books, setBooks] = useState([]); // contains data returned from API

	
	const getBooks = async () => {
		const url = 'https://www.googleapis.com/books/v1/volumes?q=' + props.searchValue;
		let response = await fetch(url)
		let data = await response.json();
		return data;
	}

	useEffect(() => {

		if (props.searchValue !== '') {

			setLoading(true); // results are likely loading
			setHasInitSearch(true); // we have started a search

			let newBooks = [];
			getBooks().then(response => {
				if (response?.items === undefined) { // need a valid response to continue
					setError(true); // notify user we're in an error state
				} else {
					setError(false); // reset error state if it's been set previously
					// add data from response into our book array
					for (var i = 0; i < response.items.length; i++) {
						let newTitle = response.items[i].volumeInfo.title;
						newBooks.push(newTitle);
					}
					setBooks(newBooks); // set state with newly acquired book data
					setLoading(false); // we've finished loading data
				}
			});
		}	
	},[props.searchValue]); // want component to re-render when a new search value is entered

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

		const bookArray = books.map((title,index) => <li key={index}>{title}</li>);

		return (
			<div className="bookList">
				<h2>Books Found:</h2>
				<ul>{bookArray}</ul>
			</div>
			
		)
	}
	
	
}

export default BookList;