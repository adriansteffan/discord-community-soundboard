import React, {Component} from 'react';
import {connect} from 'react-redux';
import BotView from './BotView.jsx'



export class BotContainer extends Component {
	
	constructor(props) {
		super(props);
		
	}


	render() {		
		return (
			<BotView/>
		);
	}

}


const mapStateToProps = (state) => ({
	authToken: state.authInformation.token
});

const mapDispatchToProps = (dispatch) => ({
});

const Bot = connect(
	mapStateToProps,
	mapDispatchToProps
)(BotContainer);

export default Bot;