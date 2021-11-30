import React from 'react';
import {useParams, Link} from 'react-router-dom';

const BookPage = (props) => {

	
	const {id} = useParams();
	const book = props?.books[id];

	if (book !== undefined) {
		// handle null inputs
		const authors = (book.authors === '') ? '[no author]' : 'by ' + book.authors;
		const title = (book.title === '') ? '[no title]' : book.title;

		return (
			<>
				<h2>
					<Link className="navLink" to="/">Search Results</Link>
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
							<li><b>Subtitle:</b> {book?.subtitle}</li>
						</ul>

					</div>
					
				</div>
				
			</>
		);

	} else {
		
		return (null);
	}
}

export default BookPage;