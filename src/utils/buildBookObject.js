// given the book's API response, build an object with the relevant info
const buildBookObject = (bookInfo) => {

	const book = bookInfo.volumeInfo;
 
	/*
	const title = returnNullIfUndefined(book?.title);
	const authors = returnNullIfUndefined(book?.authors.join(', '));
	const imageUrl = returnNullIfUndefined(book?.imageLinks?.smallThumbnail);
	const infoUrl = returnNullIfUndefined(book?.infoLink);

	return {title:title, author:authors, imageUrl:imageUrl, infoUrl:infoUrl}
	*/
	return nullIfUndefined({
		title: book?.title, 
		authors: book?.authors?.join(', '),
		imageUrl: book?.imageLinks?.smallThumbnail,
		infoUrl: book?.infoLink,
		subtitle: book?.subtitle
	});
}

const nullIfUndefined = (bookConcepts) => {

	Object.keys(bookConcepts).map((key) => bookConcepts[key] = (bookConcepts[key] === undefined) ? '' : bookConcepts[key] );

	return bookConcepts;
	
}

export default buildBookObject;