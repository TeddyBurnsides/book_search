import BookList from './BookList';
import SearchForm from './SearchForm';
import {useState} from 'react';

const App = () => {

  const [searchValue,setSearchValue] = useState(''); // search value from input field
	const [searchType, setSearchType] = useState(''); // search type from dropdown
  const [pageNumber, setPageNumber] = useState(0);

  // search input handler
  const searchForBook = (event,searchValueString,searchTypeString) => {
		event.preventDefault(); // stop page from refreshing
    if (searchValueString === undefined) searchValueString=searchValue;
    if (searchTypeString === undefined) searchTypeString=searchType;
    setPageNumber(pageNumber+1);
    setSearchValue(searchValueString);
    setSearchType(searchTypeString)
	}

  const resetPageNumber = () => {
    setPageNumber(1);
  }

  return (
    <div>
      <SearchForm searchForBook={searchForBook} />
      <BookList 
        searchForBook={searchForBook}
        searchValue={searchValue} 
        searchType={searchType}
        pageNumber={pageNumber}
        resetPageNumber={resetPageNumber}
      />
    </div>
  );
}

export default App;