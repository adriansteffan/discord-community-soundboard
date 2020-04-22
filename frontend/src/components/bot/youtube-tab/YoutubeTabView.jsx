import React from 'react';
import './youtube-tab.css';
import PlaybackControl from './../playback-control/PlaybackControl.jsx';

export default ({currentTerm, onTermTextChange, onSubmit}) => {

	const textInput = React.createRef();

	return (
		<div>
			<div>
				<form onSubmit={(e)=> {e.preventDefault(); textInput.current.blur();}}>
					<label>Link</label><br/>
					<input type="text" value={currentTerm} ref={textInput} onChange={onTermTextChange}></input><br/>
				</form>

				<button onClick={onSubmit}>Submit</button>
			</div>

			<PlaybackControl className="playback-control"/>
		</div>
	);
};
          
            