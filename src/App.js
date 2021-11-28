import BookList from './BookList';
import SearchForm from './SearchForm';
import { useEffect, useReducer, useState } from "react";
import lodash from "lodash";

const App = () => {

  const stateReducer = (prevState,action) => {
    switch(action.type) {
      case 'error':
        return {...prevState,error:true};
      case 'newSearch':
        return {...prevState, hasInitSearch:true, page:1}
      case 'getMoreResults':
        return {...prevState, page:prevState.page+1}
      case 'loadingResults':
        return {...prevState, loading:true, error: false};
      case 'finishedLoadingResults':
        return {...prevState, loading: false};
      default:
        throw new Error();
    }
  }

  const bookReducer = (prevState, action) => {
    switch (action.type) {
      case 'addBook':
        return [...prevState, action.book];
      case 'clearBookList':
        return [];
      default:
        throw new Error();
    }
  }

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

		// fetch the google books API
		const fetchBookData = async (searchCriteria, pageNumber) => {

      const searchValue=searchCriteria.value;
      const searchType=searchCriteria.type;

			if (searchValue == null) return; // don't need to fetch results if nothing was searched for

			const url = buildUrl(searchValue, searchType, pageNumber);
			let response = await fetch(url);
			let data = await response.json();

			return data;
		}

		// build the URL that will be used to send a query to the Google books API
		const buildUrl = (searchValue, searchType, pageNumber) => {

			if (searchValue === undefined) return null; // can't search for nothing (should be stopped before this point, but safety check!)
			if (searchType === undefined) searchType = 'keyword'; // default search type to keyword

			searchValue=searchValue.replaceAll(' ','+'); // API wants pluses not spaces
			
			let url='https://www.googleapis.com/books/v1/volumes?q='
			if (searchType === 'keyword') url=url + searchValue;
			if (searchType === 'title') url=url + 'intitle:' + searchValue;
			if (searchType === 'author') url=url + 'inauthor:' + searchValue;

			const resultsPerPage=2;
			url=url+'&maxResults='+resultsPerPage;
			
			const index=(pageNumber-1)*resultsPerPage;
			if (pageNumber > 0) url=url+'&startIndex='+index;

			return url;
		}

		// given the book's API response, build an object with the relevant info
		const buildBookObject = (bookInfo) => {

			const title = (bookInfo.volumeInfo?.title === undefined) ? '' : bookInfo.volumeInfo?.title;
			const authors = (bookInfo.volumeInfo?.authors === undefined) ? '' : bookInfo.volumeInfo?.authors.join(', ');
			const imageUrl = (bookInfo.volumeInfo?.imageLinks?.smallThumbnail === undefined) ? '' : bookInfo.volumeInfo?.imageLinks?.smallThumbnail;
			const infoUrl = (bookInfo.volumeInfo?.infoLink === undefined) ? '' : bookInfo.volumeInfo?.infoLink;

			return {title:title, author:authors, imageUrl:imageUrl, infoUrl:infoUrl}
		}

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
          appState={state}
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