import React, {Component} from 'react';
import {connect} from 'react-redux';
import SoundClipTabView from './SoundClipTabView.jsx'
import { playSoundClip } from './../../../actions.js'




export class SoundClipTabContainer extends Component {
	
	constructor(props) {
		super(props);
		this.state={filterWord: ""} 
	}

	soundClipRenderData(rawSoundClip, index){
		return {
			name: rawSoundClip.name,
			onClick: (e) => this.props.playSoundClip(rawSoundClip.name),
			key: index
		}
	}

	filterSoundClips(filterWord, soundclips){
		return soundclips.filter(clips => (clips.name).toLowerCase().includes(filterWord.toLowerCase()));
	}

	onFilterTextChange(event){
		this.setState({...this.state, filterWord: event.target.value});
	}

	render() {	
		
		const filteredSoundClipRenders = this.filterSoundClips(this.state.filterWord, this.props.rawSoundclips).map(this.soundClipRenderData.bind(this));
		return (
			<SoundClipTabView 
				soundclips={filteredSoundClipRenders}
				onFilterTextChange={this.onFilterTextChange.bind(this)}
			/>
		);
	}

}


const mapStateToProps = (state) => {
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