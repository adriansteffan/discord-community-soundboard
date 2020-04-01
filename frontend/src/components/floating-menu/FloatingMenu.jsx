import React, {Component} from 'react';
import {connect} from 'react-redux';
import FloatingMenuView from './FloatingMenuView.jsx';
import { changeMode } from './../../actions.js'
import config from '../../config.js'



export class FloatingMenuContainer extends Component {
	
	constructor(props) {
		super(props);
		
	}


	render() {		
		return (
			<FloatingMenuView onNextClick={() => this.props.next(this.props.authToken)}/>
		);
	}

}


const mapStateToProps = (state) => ({
	authToken: state.authInformation.token
});

const mapDispatchToProps = (dispatch) => ({
	next: (token) => {
		var xhr = new XMLHttpRequest()
		
		xhr.addEventListener('load', () => {
			console.log("success")
		})
		
		xhr.open('POST', config.backendUrl+'/bot/playauth');
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization','Token ' + token);
		xhr.send()
		console.log(xhr)
		console.log("tried:"+token)
	},
});

const FloatingMenu = connect(
	mapStateToProps,
	mapDispatchToProps
)(FloatingMenuContainer);

export default FloatingMenu;