import React from 'react';
import './youtube-tab.css';
import PlaybackControl from './../playback-control/PlaybackControl.jsx';
import TextInput from '../basic/TextInput';
import SubmitButton from '../basic/SubmitButton';

export default ({currentTerm, onTermTextChange, onSubmit}) => {

	const textInput = React.createRef();

	return (
		<div className="youtube-container">
			<div className="ytlink-container">
				<form className="yt-text-form" onSubmit={(e)=> {e.preventDefault();onSubmit();}}>
					<TextInput style={{height: "2rem"}} placeholder="Youtube video..." value={currentTerm} ref={textInput} onChange={onTermTextChange}/><br/>
				</form>
				<div className="yt-submit-container">
					<SubmitButton onClick={onSubmit}>Submit</SubmitButton>
				</div>
			</div>

			<PlaybackControl className="playback-control"/>
		</div>
	);
};
          
            