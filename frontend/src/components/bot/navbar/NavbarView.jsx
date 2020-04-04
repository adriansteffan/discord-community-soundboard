import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './navbar.css';

export default (props) => {

	return (
		<div>
			<nav className="navbar">
				<ul className="navbar-nav">
					<li className="nav-item">
						<FontAwesomeIcon icon={['fas','file-audio']} className="fa-icon"/>
					</li>
					<li className="nav-item">
						<FontAwesomeIcon icon={['fab','youtube']} className="fa-icon"/>
					</li>
					<li className="nav-item">
						<FontAwesomeIcon icon={['fas','upload']} className="fa-icon"/>
					</li>
					<li className="nav-item">
						<FontAwesomeIcon icon={['fas','cogs']} className="fa-icon"/>
					</li>
				</ul>
			</nav>
		</div>		
	);
};
          
            