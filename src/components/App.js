// core
import { useEffect, useReducer, useState } from "react";

// libraries
import lodash from "lodash";

//components
import BookList from './BookList';
import SearchForm from './SearchForm';

// reducers
import bookReducer from '../reducers/bookReducer';
import stateReducer from '../reducers/stateReducer';

// utils
import fetchBookData from '../utils/fetchBooks';
import buildBookObject from '../utils/buildBookObject';


const App = () => {

  const [searchCriteria, setSearchCriteria] = useState({value:undefined, type: undefined});
  const [prevSearchCriteria, setPrevSearchCriteria] = useState({});
  const [state, stateDispatch] = useReducer(stateReducer,{error:false, loading: false, hasInitSearch: false, page:0})
  const [books, bookDispatch] = useReducer(bookReducer,[]); 

  // search input handler
  const getBooks = (event,clearPrevResults,searchValue,searchType) => {
  
    event.preventDefault(); // avoid a page refresh

    // handle new search criteria vs. getting more books for the current search
    if (clearPrevResults) {
      stateDispatch({type:'newSearch'});
      setSearchCriteria(prevState => ({...prevState, value:searchValue, type: searchType}));
    } else {
      stateDispatch({type:'getMoreResults'});
    }
    
  }

	useEffect(() => {

		if (searchCriteria.value) {

      // if search criteria changed, clear page for new results
			if (!lodash.isEqual(prevSearchCriteria,searchCriteria)) { 
        bookDispatch({type:'clearBookList'});
        setPrevSearchCriteria({...searchCriteria})
			}

			fetchBookData(searchCriteria, state.page).then(response => {

        // if a valid response came back
				if (response?.items === undefined) { 

					stateDispatch({type:'error'});

				} else {

					stateDispatch({type:'loadingResults'});
					
					// add data from response into our array of book objects
					for (var i = 0; i < response.items.length; i++) {
						bookDispatch({type:'addBook',book:buildBookObject(response.items[i])});
					}
					
          stateDispatch({type:'finishedLoadingResults'});

				}
			});
		}	
	},[searchCriteria.value, searchCriteria.type, state.page]); // component re-render when new search or a new page is wanted


  return (
    <div>
      <SearchForm getBooks={getBooks} />
      <div className="bookList">
        {state.page>=1 && <h2>Books Found:</h2>}
        <BookList 
          state={state}
          searchCriteria={searchCriteria}
          prevSearchCriteria={prevSearchCriteria}
          books={books}
          getBooks={getBooks}
        />
      </div>
    </div>
  );
}

export default App;