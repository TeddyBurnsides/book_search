import React from 'react';
import {useParams, Link} from 'react-router-dom';

const BookPage = (props) => {

	const getSingleBook = async () => {
		let response = await fetch('https://www.googleapis.com/books/v1/volumes/GNnxzQEACAAJ');
		let data = await response.json();

		console.log(data)

		return data;
	}

	
	const {id} = useParams();
	const book = props?.books[props.index];

	console.log(book);
	console.log(id)
	console.log(props.books);

	if (book !== undefined) {
		// handle null inputs
		const authors = (book.authors === '') ? '[no author]' : 'by ' + book.authors;
		const title = (book.title === '') ? '[no title]' : book.title;
		const subtitle = (book.subtitle === '' ) ? '' : 'Subtitle: ' + book.subtitle;

		return (
			<>
				<h2>
					<Link className="navLink" to="/">&larr; Search Results</Link>
					<span className="spacer">/</span>
					<span className="active">{title}</span>
				</h2>
				<div className="bookInfo">
					<div className="coverImage">
						<img alt='Book Cover' src={book.imageUrl} />
					</div>
					<div className="bookDesc">
						<h4>{authors}</h4>
						<ul>
							<li>{subtitle}</li>
						</ul>

					</div>
					
				</div>
				
			</>
		);

	} else {
		
		//console.log(getSingleBook());

		return (null);
	}
}

export default BookPage;