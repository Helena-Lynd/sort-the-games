import React, { useState }  from 'react';

/**
 * Creates an accordion, which opens to display the inner content when clicked
 *
 * @param {string} title	: the title to be displayed on the accordion header
 * @param {string} content 	: the content to be displayed when the accordion is open
 * @param {string} color	: the color of the accordion header, formatted '#xxxxxx'
 * @param {string} bgColor	: the background color of the accordion content, formatted '#xxxxxx'
 */
export default function Accordion(props) {
	// States whether the accordion is open or closed
	const [isActive, setIsActive] = useState(false);

	return (
		<div>
			<div className="accordion-title" style={{ backgroundColor: props.color }} onClick={() => setIsActive(!isActive)}>
				<div>{props.title}</div>
			</div>
			{isActive && <div className="accordion-content" style={{ backgroundColor: props.bgColor }}>{props.content}</div>}
		</div>
	);
};