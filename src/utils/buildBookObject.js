// given the book's API response, build an object with the relevant info
const buildBookObject = (bookInfo) => {

	const book = bookInfo.volumeInfo;
 
	return nullIfUndefined({
		id: bookInfo.id,
		title: book?.title, 
		authors: book?.authors?.join(', '),
		imageUrl: book?.imageLinks?.smallThumbnail,
		infoUrl: book?.infoLink,
		subtitle: book?.subtitle,
	});
}

// given an object returns a copy where no elements are undefined (and now are null if they were undefined)
const nullIfUndefined = (bookConcepts) => {

	Object.keys(bookConcepts).map((key) => bookConcepts[key] = (bookConcepts[key] === undefined) ? '' : bookConcepts[key] );

	return bookConcepts;
	
}

export default buildBookObject;