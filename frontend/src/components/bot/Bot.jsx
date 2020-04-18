import React, {Component} from 'react';
import {connect} from 'react-redux';
import BotView from './BotView.jsx';
import {fetchBackendPayload, changeTab} from './../../actions.js';
import { Redirect } from "react-router-dom";


export class BotContainer extends Component {
	
	constructor(props) {
		super(props);
	}


	render() {	
		console.log(this.props.authToken);
		if(this.props.authToken === null || this.props.authTokenExpired){
			return (
				<Redirect to={"/auth"} />
			);
		}
		this.props.fetchBackednPayload();
		return (
			<BotView activeTab={this.props.activeTab}/>
		);
	}

}


const mapStateToProps = (state) => ({
	authToken: state.currentInformation.authToken,
	authTokenExpired: state.currentInformation.authTokenExpired,
	activeTab: state.menu.activeTab,
	
});

const mapDispatchToProps = (dispatch) => ({
	fetchBackednPayload: () => dispatch(fetchBackendPayload()),
});

const Bot = connect(
	mapStateToProps,
	mapDispatchToProps
)(BotContainer);

export default Bot;