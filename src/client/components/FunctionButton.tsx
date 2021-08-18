import React from 'react';

function FunctionButton (props) {

	const {func, name} = props;

	return (
		<div id="function-button" onClick={func} >
			{name}
		</div>
	)
}

export default FunctionButton;