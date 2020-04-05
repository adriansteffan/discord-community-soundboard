import React from 'react';
import './soundclip-tab.scss';

export default (props) => {
	
	const {soundclips} = props;
	const soundClipButtons = [];

  	soundclips.forEach(item => soundClipButtons.push(<div className="card" onClick={item.onClick} key={item.key}>{item.name}</div>))


	return (
		<div className="container">
			<section className="soundclip-button-grid">
				{soundClipButtons}
			</section>
		</div>
	);
};
          
            