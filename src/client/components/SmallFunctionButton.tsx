import React from 'react';

function SmallFunctionButton (props) {

	const {func, name, icon} = props;

	return (
		<div id="small-function-button" onClick={func}>
			{icon}
			{name}
		</div>
	)
}

export default SmallFunctionButton;