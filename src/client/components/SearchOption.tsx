import React, { useState, useEffect} from 'react';

function SearchOption (props) {
	const {func, name, defaultOption} = props;
	// const fillColor = include ? "#5AB55E" : "#414346"
	// const fontColor = include ? "#414346" : "#5AB55E"

	const green = "#5AB55E";
	const grey = "#414346";


	const [include, setInclude] = useState(defaultOption);
	const [styles, setStyles] = useState(
		{
			color: include ? grey : green,
			backgroundColor: include ? green : grey
		});


	useEffect(() => {
		setStyles({
			color: include ? grey : green,
			backgroundColor: include ? green : grey
		})
	},[include])

	const handleClick = () => {
		setInclude(!include);
		func(name);
	}

	return(
		<div id="search-option" onClick={handleClick} style={styles}>
			{name}
		</div>
	)
}

export default SearchOption;