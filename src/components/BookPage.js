import React from 'react';

const BookPage = (props) => {
	
	const book = props?.books[props.index];

	if (book !== undefined) {

		// handle null inputs
		const authors = (book.authors === '') ? '[no author]' : 'by ' + book.authors;
		const title = (book.title === '') ? '[no title]' : book.title;
		const subtitle = (book.subtitle === '') ? '' : '(' + book.subtitle + ')';

		let categories = [];
		if (book?.categories) {
			categories = book.categories?.map((cat,index) => {
				return (
					<span key={index} className="category">{cat}</span>
				);
			});
		}
		

		return (
			<div className="bookDetails">
				<h2>
					<button onClick={(event) => props.hideBookDetails(event)} className="navLink" to="/">&larr; Search Results</button>
					<span className="spacer">/</span>
					<span className="active">{title} {subtitle}</span>
				</h2>
				<div className="bookInfo">
					<div className="coverImage">
						<img alt='Book Cover' src={book.imageUrl} />
					</div>
					<div className="bookDesc">
						<h4>{authors}</h4>
						
						<ul>
							{book.description && <li><span className="caption">Description: </span><span className="value">{book.description}</span></li>}
							{book.publishedDate && <li><span className="caption">Published Date: </span><span className="value">{book.publishedDate}</span></li>}
							{book.publisher && <li><span className="caption">Publisher: </span><span className="value">{book.publisher}</span></li>}
							{book.pageCount && <li><span className="caption">Page Count: </span><span className="value">{book.pageCount}</span></li>}
						</ul>
						<div className="categories">{categories}</div>

					</div>
					
				</div>
				
			</div>
		);

	} else {
		
		//console.log(getSingleBook());

		return (null);
	}
}

export default BookPage;