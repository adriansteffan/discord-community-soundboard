import React from 'react';
import './bot.css';
import Navbar from './navbar/Navbar.jsx'
import SoundClipTab from './soundclip-tab/SoundClipTab.jsx'
import YoutubeTab from './youtube-tab/YoutubeTab.jsx'
import UploadTab from './upload-tab/UploadTab.jsx'
import SettingsTab from './settings-tab/SettingsTab.jsx'

export default (props) => {

	const {activeTab} = props; 

	const tabs = {
		soundclips: <SoundClipTab/>,
		youtube: <YoutubeTab/>,
		upload: <UploadTab/>,
		settings: <SettingsTab/>,
	}

	return (
		<div className = "bot-container">
			<Navbar/>
			<div className="content-container">
				{tabs[activeTab]}
			</div>
		</div>
	);
};
          
            