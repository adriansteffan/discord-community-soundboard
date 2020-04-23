import React, {Component} from 'react';
import './basic.css';


export default class TextInput extends Component {

	render() {		
		return (
			<input type="text"  className="searchbar" {...this.props}/>
		);
	}
}