import React from 'react';
import { useState } from "react";

const SearchForm = (props) => {

	const [searchValue,setSearchValue] = useState(''); // free text search field
	const [searchType, setSearchType] = useState('keyword'); // option drop down box

	const formClass = props.state.hasInitSearch ? 'bookSearch' : 'bookSearch frontAndCenter';

	return (

		<form className={formClass}>
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
			<button onClick={(event) => props.getBooks(event,true,searchValue,searchType)}>Search</button>
		</form>
		
	);
}

export default SearchForm;