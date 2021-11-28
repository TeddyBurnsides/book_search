// components
import Book from './Book';
import MoreResultsButton from './MoreResultsButton';

const BookList = (props) => {
	
	// if books API returns no results or bad data
	if (props.state.error) { 
		
		return (
			<p className="message">Unable to find any books</p>
		);

	// if no search has been started yet
	} else if (props.searchCriteria.value === undefined) { 
		
		return (null);

	// books have been found
	} else if (props.books.length > 0) {
	
		const bookArray = props.books.map((book,index) => <Book key={index} book={book} /> );
		return (
			<>
				<ul>{bookArray}</ul>
				<MoreResultsButton getBooks={props.getBooks} />
			</>
		);

	} else if (props.state.loading) {

		return (
			<p>SOS</p>
		)

	// else we're loading results
	} else { 
		
		return (
			<p className="message">Loading...</p>
		);
	
	}
	
}

export default BookList;