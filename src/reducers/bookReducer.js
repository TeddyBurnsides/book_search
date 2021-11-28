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

export default bookReducer;