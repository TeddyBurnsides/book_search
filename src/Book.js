
const Book = (props) => {
	return (
		<li key={props.index}>
			<h3>{props.book?.title}</h3>
			<h4>by {props.book?.author}</h4>
		</li>
	)
}

export default Book;