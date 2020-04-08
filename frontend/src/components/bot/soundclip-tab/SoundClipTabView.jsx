import React from 'react';
import './soundclip-tab.scss';
import PlaybackControl from './../playback-control/PlaybackControl.jsx';

export default (props) => {
	
	const {soundclips} = props;
	const soundClipButtons = [];

  	soundclips.forEach(item => soundClipButtons.push(<div className="card" onClick={item.onClick} key={item.key}>{item.name}</div>))

	

	return (
		<div className="container">
			
			<div className="dropdown collection-dropdown">
				<button onClick={() => 0} className="dropbtn">All</button>
				<div className="dropdown-content">
		
				</div>
			</div>


			<div className="dropdown tags-dropdown">
				<button onClick={() => 0} className="dropbtn">Tags 0</button>
				<div className="dropdown-content">
					
				</div>
			</div>


			<input type="text" placeholder="Filter..." className="searchbar"/>
			

			<PlaybackControl classname="playback-control"/>
			
			
			<section className="soundclip-button-grid">
				{soundClipButtons}
			</section>

		</div>
	);
};
          
            