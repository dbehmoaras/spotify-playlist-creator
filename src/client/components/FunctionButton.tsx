import React from 'react';

function FunctionButton (props) {

	const {func, name, data} = props;

	return (
		<div id="function-button" onClick={() => {func(data)}}>
			{name}
		</div>
	)
}

export default FunctionButton;