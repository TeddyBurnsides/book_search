import React from 'react';
import { useEffect, useReducer, useState } from "react";

//components
import BookList from './BookList';
import SearchForm from './SearchForm';
import BookPage from './BookPage';

// reducers
import bookReducer from '../reducers/bookReducer';
import stateReducer from '../reducers/stateReducer';

// utils
import fetchBookData from '../utils/fetchBooks';
import buildBookObject from '../utils/buildBookObject';


const App = () => {

  const [searchCriteria, setSearchCriteria] = useState({value:undefined, type: undefined});
  const [state, stateDispatch] = useReducer(stateReducer,{error:false, loading: false, hasInitSearch: false, page:0, openBook:null})
  const [books, bookDispatch] = useReducer(bookReducer,[]);

  // search input handler
  const getBooks = (event,newSearch,searchValue,searchType) => {
  
    event.preventDefault(); // avoid a page refresh

    if (searchValue === "") return; // why even try if there is no search criteria?

    // handle new search criteria vs. getting more books for the current search
    if (newSearch) {
      stateDispatch({type:'newSearch'});
      setSearchCriteria(prevState => ({...prevState, value:searchValue, type: searchType}));
      bookDispatch({type:'clearBookList'});    
    } else {
      stateDispatch({type:'getMoreResults'});  
    }

  }

  const showBookDetails = (event, bookId) => {

    event.preventDefault(); // prevent page refresh

    stateDispatch({
      type: 'showBookDetails',
      bookId: bookId
    });
  }

  const hideBookDetails = (event) => {

    event.preventDefault(); // prevent page refresh

    stateDispatch({type: 'hideBookDetails'});
  }

  const toggleDarkMode = () => {

    document.body.classList.toggle('darkTheme');

  }

	useEffect(() => {

		if (searchCriteria.value) {

      stateDispatch({type:'loadingResults'}); // starting loading before async fetch happens

			fetchBookData(searchCriteria, state.page).then(response => {

        // if a valid response came back
				if (response?.items === undefined) { 

					stateDispatch({type:'error'}); // something went wrong

				} else {
					
					// add data from response into our array of book objects
					for (var index = 0; index < response.items.length; index++) {
						bookDispatch({
              type:'addBook',
              book:buildBookObject(response.items[index])
            });
					}
				
				}
			}).then(() => stateDispatch({type:'finishedLoadingResults'})); // wait for async function before ending loading state
		}	
	},[searchCriteria, state.page]); // component re-render when new search or a new page is wanted

  return (
    <>
      <button id="darkModeButton" onClick={toggleDarkMode}></button>
      <SearchForm state={state} getBooks={getBooks} />
      <div className="bookList">
        {state.openBook === null && <BookList
          state={state}
          searchCriteria={searchCriteria}
          books={books}
          getBooks={getBooks}
          showBookDetails={showBookDetails}
        />}
      </div>
      {state.openBook !== null && <BookPage books={books} index={state.openBook} hideBookDetails={hideBookDetails} />}   
    </>
  );
}

export default App;