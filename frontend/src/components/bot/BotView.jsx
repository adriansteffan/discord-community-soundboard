import React from 'react';
import './bot.css';
import Navbar from './navbar/Navbar.jsx'
import SoundClipTab from './soundclip-tab/SoundClipTab.jsx'

export default (props) => {

	const {activeTab} = props; 

	const tabs = {
		soundclips: <SoundClipTab/>
	}

	return (
		<div className = "bot-container">
			<Navbar/>
			{tabs[activeTab]}
		</div>
	);
};
          
            