import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './dropdown.css';


export default class Dropdown extends Component {
	
	constructor(props) {
		super(props);
		this.state={open:false}
	}

	onButtonClick(){
		this.setState({...this.state, open: !this.state.open})
	}

	render() {		
		return (
		<div>
			<div className="dropbtn" onClick={this.onButtonClick.bind(this)}>
				{this.props.value}
				<div className="icon-container">
					<FontAwesomeIcon icon={['fas','caret-down']} className="fa-icon" style={{color:"#ffffff"}}/>
				</div>
			</div>
			{this.state.open && this.props.children}
		</div>
		);
	}
}