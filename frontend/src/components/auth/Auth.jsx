import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthView from './AuthView.jsx';
import config from '../../config.js'
import { Redirect } from "react-router-dom";



export class AuthContainer extends Component {
	
	constructor(props) {
		super(props);
		

		let query = new URLSearchParams(this.props.location.search);
		let discordCode = query.get("code");

		var xhr = new XMLHttpRequest()
		

		xhr.addEventListener('load', () => {
			
			console.log(xhr.responseText)
			this.props.setAuthToken(xhr.responseText.replace(/["']/g, ""));
			
			
		})
		
		xhr.open('POST', config.backendUrl+'/users/create_access')
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send("code="+discordCode+"&redirect_uri="+config.frontendUrl+"/auth")
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