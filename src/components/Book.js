import React from 'react';
import { Link } from 'react-router-dom';

const Book = (props) => {

	// handle null inputs
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
			<Link to={'/book/' + props.index} className="link">View</Link> 
			
		</li>
	);

}

export default Book;