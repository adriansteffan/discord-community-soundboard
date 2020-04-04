import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthView from './AuthView.jsx';
import config from '../../config.js'
import { Redirect } from "react-router-dom";
import {getCookie} from './../../utils.js'



export class AuthContainer extends Component {
	
	constructor(props) {
		super(props);
		const authToken = getCookie("authToken");
		if (authToken){
			this.props.setAuthToken(authToken);
			return;

		} 
			
		let query = new URLSearchParams(this.props.location.search);
		let discordCode = query.get("code");
		console.log("1");
		if(discordCode == null){
			window.location.replace(config.oauthUrl+"&prompt=none");
			return;
		}
		console.log("2");

		var xhr = new XMLHttpRequest();

		xhr.addEventListener('load', () => {
				
			let authTokenClean = xhr.responseText.replace(/["']/g, "");
			document.cookie = "authtoken="+authTokenClean;
			this.props.setAuthToken(authTokenClean);
		})
			
		xhr.open('POST', config.backendUrl+'/users/create_access');
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send("code="+discordCode+"&redirect_uri="+config.frontendUrl+"/auth");
		
	}


	render() {
		
		if (!this.props.authToken){
			return (
				<AuthView/>
			);
		}

		return <Redirect to={"/bot"} />	
	}

}


const mapStateToProps = (state) => ({
	authToken: state.authInformation.token
});

const mapDispatchToProps = (dispatch) => ({
	setAuthToken: (token) => {
		
			
		dispatch({
			type: "SET_AUTHTOKEN",
			token: token,
		})
	},
});

const Auth = connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthContainer);

export default Auth;