import { useState } from "react";

const SearchForm = (props) => {

	const [searchValue,setSearchValue] = useState(''); // search value from input field
	const [searchType, setSearchType] = useState('keyword'); // search type from dropdown

	// wrapper for search function in App.js. This allows for easy local state adjustments
	const searchForBook = (event,searchValue,searchType) => {
		// setSearchValue(''); // clear input field after performing search
		props.searchForBook(event,searchValue,searchType); // call to main function in App.js
	}

	return (
		<form>
			<input 
				type="text" 
				value={searchValue}
				placeholder="Search books..."
				onChange={event => setSearchValue(event.target.value)}
			/>
			<select value={searchType} onChange={event => setSearchType(event.target.value)}>
				<option value="keyword">Keyword</option>
				<option value="title">Title</option>
				<option value="author">Author</option>
			</select>
			<button onClick={(event) => searchForBook(event,searchValue,searchType)}>Search</button>
		</form>
	)

}

export default SearchForm;