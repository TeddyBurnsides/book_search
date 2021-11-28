// components
import Book from './Book';

const BookList = (props) => {
	
	// if no search has been started yet
	if (props.searchCriteria.value === undefined) { 
		
		return (null);

	// books have been found
	} else if (props.books.length > 0) {
	
		const bookArray = props.books.map((book,index) => <Book key={index} book={book} /> );
		return (
			<ul>{bookArray}</ul>
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