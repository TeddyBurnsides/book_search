
const Book = (props) => {
	// some books apparently don't have authors
	const authorString = (props.book.author === '') ? '[no author]' : 'by ' + props.book.author;
	return (
		<li key={props.index}>
			<div className="coverImage">
				<img alt='Book Cover' src={props.book.imageUrl} />
			</div>
			<div className="content">
				<h3><a href={props.book.infoUrl}>{props.book.title}</a></h3>
				<h4>{authorString}</h4>
			</div>
		</li>
	)
}

export default Book;