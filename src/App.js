import BookList from './BookList';
import SearchForm from './SearchForm';
import {useState} from 'react';

const App = () => {

  const [searchValue,setSearchValue] = useState(''); // search value from input field
	const [searchType, setSearchType] = useState(''); // search type from dropdown

  // search input handler
  const searchForBook = (event,searchValueString,searchTypeString) => {
		event.preventDefault(); // stop page from refreshing
    setSearchValue(searchValueString);
    setSearchType(searchTypeString)
	}

  return (
    <div>
      <SearchForm searchForBook={searchForBook} />
      <BookList searchValue={searchValue} searchType={searchType} />
    </div>
  );
}

export default App;