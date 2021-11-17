
const Book = (props) => {
	// some books apparently don't have authors
	const authorString = (props.book.author === '') ? '[no author]' : 'by ' + props.book.author;
	return (
		<li key={props.index}>
			<a rel="noreferrer" target="_blank" href={props.book.infoUrl} className="coverImage">
				<img alt='Book Cover' src={props.book.imageUrl} />
			</a>
			<div className="content">
				<h3><a rel="noreferrer" target="_blank" href={props.book.infoUrl}>{props.book.title}</a></h3>
				<h4>{authorString}</h4>
			</div>
			<a rel="noreferrer" target="_blank" href={props.book.infoUrl} className="link">View</a>
		</li>
	)
}

export default Book;