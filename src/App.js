import BookList from './BookList';
import SearchForm from './SearchForm';
import {useState} from 'react';

const App = () => {

  const [searchValue,setSearchValue] = useState('') // search value from input field

  // search input handler
  const searchForBook = (event,searchValue) => {
		event.preventDefault();
    setSearchValue(searchValue); // set state
	}

  return (
    <div>
      <SearchForm searchForBook={searchForBook} />
      <BookList searchValue={searchValue} />
    </div>
  );
}

export default App;