import React from 'react';

function FunctionButton (props) {

	const {funcType} = props;

	return (
		<div id="function-button" onClick={()=>console.log(`${funcType} clicked`)}>
			{funcType}
		</div>
	)
}

export default FunctionButton;