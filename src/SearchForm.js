import { useState } from "react";

const SearchForm = (props) => {

	const [searchValue,setSearchValue] = useState(''); // phrase we're searching for

	// wrapper for search function in App.js that lets us reset the state (clears input field)
	const searchForBook = (event,searchValue) => {
		setSearchValue('');
		props.searchForBook(event,searchValue); // call to main function in App.js
	}

	return (
		<form>
			<input 
				type="text" 
				value={searchValue}
				placeholder="Enter a search"
				onChange={event => setSearchValue(event.target.value)}
			/>
			<button onClick={(event) => searchForBook(event,searchValue)}>Search</button>
		</form>
	)

}

export default SearchForm;