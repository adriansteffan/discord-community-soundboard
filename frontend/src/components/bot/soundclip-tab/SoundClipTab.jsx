import React, {Component} from 'react';
import {connect} from 'react-redux';
import SoundClipTabView from './SoundClipTabView.jsx'
import { playSoundClip } from './../../../actions.js'




export class SoundClipTabContainer extends Component {
	
	constructor(props) {
		super(props);
	}

	soundClipRenderData(rawSoundClip, index){
		return {
			name: rawSoundClip.name,
			onClick: (e) => this.props.playSoundClip(rawSoundClip.name),
			key: index
		}
	}

	render() {		
		return (
			<SoundClipTabView soundclips={this.props.rawSoundclips.map(this.soundClipRenderData.bind(this))}/>
		);
	}

}


const mapStateToProps = (state) => {
	console.log(state);
	return {
		rawSoundclips: state.backendData.payload.sound_clips,
	}
};

const mapDispatchToProps = (dispatch) => ({
	playSoundClip: (name) => {dispatch(playSoundClip(name))}
});

const SoundClipTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(SoundClipTabContainer);

export default SoundClipTab;