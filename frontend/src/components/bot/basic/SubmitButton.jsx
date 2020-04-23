import React, {Component} from 'react';
import './basic.css';


export default class SubmitButton extends Component {
	
	render() {		
		return (
		<button className="submit-button" onClick={this.props.onClick}>
			{this.props.children}
		</button>
		);
	}
}