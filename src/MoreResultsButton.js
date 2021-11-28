const MoreResultsButton = (props) => {

	return (
		<div onClick={(event) => props.getBooks(event,false)} className="moreResults">Load More</div>
	)
	
}

export default MoreResultsButton;