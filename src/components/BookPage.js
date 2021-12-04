import React from 'react';

const BookPage = (props) => {

	const getSingleBook = async () => {
		let response = await fetch('https://www.googleapis.com/books/v1/volumes/GNnxzQEACAAJ');
		let data = await response.json();

		console.log(data)

		return data;
	}
	
	const book = props?.books[props.index];

	if (book !== undefined) {
		// handle null inputs
		const authors = (book.authors === '') ? '[no author]' : 'by ' + book.authors;
		const title = (book.title === '') ? '[no title]' : book.title;
		const subtitle = (book.subtitle === '' ) ? '' : 'Subtitle: ' + book.subtitle;

		return (
			<>
				<h2>
					<button className="navLink" to="/">&larr; Search Results</button>
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