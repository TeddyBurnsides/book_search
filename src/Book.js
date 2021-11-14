
const Book = (props) => {
	return (
		<li key={props.index}>
			<div className="coverImage">
				<img src={props.book.imageUrl} />
			</div>
			<div className="content">
				<h3><a href={props.book.infoUrl}>{props.book.title}</a></h3>
				<h4>by {props.book.author}</h4>
			</div>
		</li>
	)
}

export default Book;