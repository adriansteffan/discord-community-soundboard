import React, {Component} from 'react';
import {connect} from 'react-redux';
import YoutubeTabView from './YoutubeTabView.jsx'




export class YoutubeTabContainer extends Component {
	
	constructor(props) {
		super(props);
	}

	

	render() {		
		return (
			<YoutubeTabView/>
		);
	}

}


const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => ({
});

const YoutubeTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(YoutubeTabContainer);

export default YoutubeTab;