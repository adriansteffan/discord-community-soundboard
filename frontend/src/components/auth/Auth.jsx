import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthView from './AuthView.jsx';
import config from '../../copied_config.js'
import { Redirect } from "react-router-dom";
import {setAuthToken} from './../../actions.js'
import {getCookie} from './../../utils.js'



export class AuthContainer extends Component {
	
	constructor(props) {
		super(props);
		const authToken = getCookie("authtoken");
		if (authToken){
			this.props.setAuthToken(authToken);
			this.state={authenticated: true};
			return;

		} 
			
		this.state={authenticated: false};

		let query = new URLSearchParams(this.props.location.search);
		let discordCode = query.get("code");
		
		if(discordCode == null){
			window.location.replace(config.oauthUrl+"&prompt=none");
			return;
		}
		
		

		var xhr = new XMLHttpRequest();

		xhr.addEventListener('load', () => {
				
			let authTokenClean = xhr.responseText.replace(/["']/g, "");
			document.cookie = "authtoken="+authTokenClean;
			this.props.setAuthToken(authTokenClean);
			this.setState({authenticated: true})
		})
			
		xhr.open('POST', config.backendUrl+'/users/create_access');
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send("code="+discordCode+"&redirect_uri="+config.frontendUrl+"/auth");
		
	}


	render() {
		if (!this.state.authenticated){
			return (
				<AuthView/>
			);
		}

		return <Redirect to={"/bot"} />	
	}

}


const mapStateToProps = (state) => ({
	authToken: state.currentInformation.authToken
});

const mapDispatchToProps = (dispatch) => ({
	setAuthToken: (token) => dispatch(setAuthToken(token)),
});

const Auth = connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthContainer);

export default Auth;