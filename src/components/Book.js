import React from 'react';

const Book = (props) => {

	// handle null inputs
	const authors = (props.book.authors === '') ? '[no author]' : 'by ' + props.book.authors;
	const titles = (props.book.title === '') ? '[no title]' : props.book.title;
	const subTitle = (props.book.subtitle === '') ? '' : '(' + props.book.subtitle + ')';

	return (
		<li key={props.index}>
			<div onClick={(event) => props.showBookDetails(event,props.index)} className="coverImage">
				<img alt='Book Cover' src={props.book.imageUrl} />
			</div>
			<div className="content">
				<h3 onClick={(event) => props.showBookDetails(event,props.index)}>{titles} {subTitle}</h3>
				<h4>{authors}</h4>
				
			</div>
			
		</li>
	);

}

export default Book;