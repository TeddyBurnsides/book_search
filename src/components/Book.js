import React from 'react';

const Book = (props) => {

	// handle null inputs
	const bookId = props.book.id
	const authors = (props.book.authors === '') ? '[no author]' : 'by ' + props.book.authors;
	const titles = (props.book.title === '') ? '[no title]' : props.book.title;

	return (
		<li key={props.index}>
			<div className="coverImage">
				<img alt='Book Cover' src={props.book.imageUrl} />
			</div>
			<div className="content">
				<h3>{titles}</h3>
				<h4>{authors}</h4>
			</div>
			
			
		</li>
	);

}

export default Book;