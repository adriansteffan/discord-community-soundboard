import React from 'react';
import './soundclip-tab.scss';
import PlaybackControl from './../playback-control/PlaybackControl.jsx';
import Dropdown from '../dropdown/Dropdown';
import DropdownMenu from '../dropdown/DropdownMenu';
import DropdownItem from '../dropdown/DropdownItem';
import TextInput from '../basic/TextInput';

export default (props) => {
	
	const {soundclips,onFilterTextChange} = props;
	const soundClipButtons = [];
	

  	soundclips.forEach(item => soundClipButtons.push(<div className="card noselect" onClick={item.onClick} key={item.key}>{item.name}</div>))


	return (
		<div className="container">
			
			<div className="collection-dropdown">
				<Dropdown value="Coming Soon">
					<DropdownMenu>
						
					</DropdownMenu>
				</Dropdown>
			</div>

			<div className="tags-dropdown">
				<Dropdown value="Coming Soon">
					<DropdownMenu>
						
					</DropdownMenu>
				</Dropdown>
			</div>

			<div className="searchbar-container">
				<TextInput placeholder="Filter..." onChange={onFilterTextChange}/>
			</div>

			<div className="playback-control">
				<PlaybackControl/>
			</div>
			
			<section className="soundclip-button-grid">
				{soundClipButtons}
			</section>

		</div>
	);
};
          
            