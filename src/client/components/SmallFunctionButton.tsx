import React from 'react';

function SmallFunctionButton (props) {

	const {func, name, icon} = props;

	return (
		<div id="small-function-button" onClick={()=>func(name)}>
			{icon}
		</div>
	)
}

export default SmallFunctionButton;