import React, { useState, useEffect} from 'react';

function SearchOption (props) {
	const {func, name, include} = props;

	const fillColor = include ? "#5AB55E" : "#414346"
	const fontColor = include ? "#414346" : "#5AB55E"


	const [styles, setStyles] = useState(
		{color: fontColor, backgroundColor: fillColor});

	useEffect(()=> {

	},[styles])

	return(
		<div id="search-option" onClick={()=>func(name)} style={styles}>
			{name}
		</div>
	)
}

export default SearchOption;