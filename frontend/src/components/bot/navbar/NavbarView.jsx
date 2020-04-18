import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './navbar.css';

export default (props) => {

	const {changeTab} = props;

	return (
		<div>
			<nav className="navbar">
				<ul className="navbar-nav">
					<li className="nav-item">
						<FontAwesomeIcon icon={['fas','bullhorn']} className="fa-icon" style={{color:"#99aab5"}} onClick={()=>changeTab('soundclips')}/>
					</li>
					<li className="nav-item">
						<FontAwesomeIcon icon={['fab','youtube']} className="fa-icon" style={{color:"#99aab5"}} onClick={()=>changeTab('youtube')}/>
					</li>
					<li className="nav-item">
						<FontAwesomeIcon icon={['fas','upload']} className="fa-icon" style={{color:"#99aab5"}} onClick={()=>changeTab('upload')}/>
					</li>
					<li className="nav-item">
						<FontAwesomeIcon icon={['fas','sliders-h']} className="fa-icon" style={{color:"#99aab5"}} onClick={()=>changeTab('settings')}/>
					</li>
				</ul>
			</nav>
		</div>		
	);
};
          
            