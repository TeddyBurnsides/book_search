// given the book's API response, build an object with the relevant info
const buildBookObject = (bookInfo) => {
 
	const title = (bookInfo.volumeInfo?.title === undefined) ? '' : bookInfo.volumeInfo?.title;
	const authors = (bookInfo.volumeInfo?.authors === undefined) ? '' : bookInfo.volumeInfo?.authors.join(', ');
	const imageUrl = (bookInfo.volumeInfo?.imageLinks?.smallThumbnail === undefined) ? '' : bookInfo.volumeInfo?.imageLinks?.smallThumbnail;
	const infoUrl = (bookInfo.volumeInfo?.infoLink === undefined) ? '' : bookInfo.volumeInfo?.infoLink;

	return {title:title, author:authors, imageUrl:imageUrl, infoUrl:infoUrl}
}
export default buildBookObject;