import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlaybackControlView from './PlaybackControlView.jsx';
import {controlPlayback} from './../../../actions.js';


export class PlaybackControlContainer extends Component {
	
	constructor(props) {
		super(props);

	}


	render() {		
		return (
			<PlaybackControlView controlPlayback={this.props.controlPlayback}/>
		);
	}

}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
	controlPlayback : (control) => (dispatch(controlPlayback(control)))
});

const PlaybackControl = connect(
	mapStateToProps,
	mapDispatchToProps
)(PlaybackControlContainer);

export default PlaybackControl;