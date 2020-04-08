import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './playback-control.css';

export default (props) => {

	const {controlPlayback} = props;

	return (
		<div>
			<nav className="toolbar">
				<ul className="toolbar-list">
					<li className="toolbar-item">
						<FontAwesomeIcon icon={['fas','backward']} className="fa-icon" onClick = {() => controlPlayback("prev")}/>
					</li>
					<li className="toolbar-item">
						<FontAwesomeIcon icon={['fas','pause']} className="fa-icon" onClick = {() => controlPlayback("pause")}/>
					</li>
					<li className="toolbar-item">
						<FontAwesomeIcon icon={['fas','play']} className="fa-icon" onClick = {() => controlPlayback("resume")}/>
					</li>
					<li className="toolbar-item">
						<FontAwesomeIcon icon={['fas','forward']} className="fa-icon" onClick = {() => controlPlayback("skip")}/>
					</li>
					<li className="toolbar-item">
						<FontAwesomeIcon icon={['fas','stop-circle']} className="fa-icon" onClick = {() => controlPlayback("stop")}/>
					</li>
				</ul>
			</nav>
		</div>		
	);
};
          
            