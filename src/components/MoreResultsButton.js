import React from 'react';

const MoreResultsButton = (props) => {

	const buttonText = props.state.loading ? 'Loading...' : 'Load More';
	const buttonClass = props.state.loading ? 'moreResults disabled' : 'moreResults';

	return (
		<div onClick={(event) => props.getBooks(event,false)} className={buttonClass}>{buttonText}</div>
	)
	
}

export default MoreResultsButton;