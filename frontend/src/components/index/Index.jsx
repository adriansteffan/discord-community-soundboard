import React, {Component} from 'react';
import {connect} from 'react-redux';
import { changeMode } from './../../actions.js'
import { Redirect } from "react-router-dom";
import config from '../../config.js'



export class IndexContainer extends Component {
	
	constructor(props) {
		super(props);
	}


	render() {		

		// Check if we are authenticated, redirect to discord otherwise
		if (this.props.authToken){
			return <Redirect to={"/bot"} />
		}
		else{
			window.location.replace(config.oauthUrl+"&prompt=none");
		}
	}

}


const mapStateToProps = (state) => ({
	authToken: state.authInformation.token
});

const mapDispatchToProps = (dispatch) => ({
	next: () => {
	
	},
});

const Index = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndexContainer);

export default Index;