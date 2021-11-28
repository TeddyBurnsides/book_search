

const MoreResultsButton = (props) => {

	return (
		<div onClick={(event) => props.getBooks(event,false)} className="moreResults">{props.loading ? 'Loading...' : 'Load More'}</div>
	)
	
}

export default MoreResultsButton;