// components
import React from 'react';
import Book from './Book';
import MoreResultsButton from './MoreResultsButton';

const BookList = (props) => {
	
	// if no search has been started yet
	if (props.searchCriteria.value === undefined) { 
		
		return (
			<p className="message">What will you read today?</p>
		);

	// books have been found
	} else if (props.books.length > 0) {
	
		const bookArray = props.books.map((book,index) => <Book key={index} index={index} book={book} /> );
		return (
			<>
				{props.state.page>=1 && <h2>Search Results</h2>}
				<ul id="bookList">{bookArray}</ul>
				{props.books.length > 0 && <MoreResultsButton state={props.state} getBooks={props.getBooks} />}
			</>
		);

	// else we're loading results
	} else if (props.state.loading) { 
		
		return (
			<p className="message">Loading...</p>
		);
	
	// something bad happened - error out
	} else if (props.state.error) {
	
		return (
			<p className="message">Sorry, we weren't able to find any books with that criteria. :(</p>
		);
	// unknown state
	} else {

		return (null);
		
	}
	
}

export default BookList;