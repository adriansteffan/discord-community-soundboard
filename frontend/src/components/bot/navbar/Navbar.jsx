import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavbarView from './NavbarView.jsx'


export class NavbarContainer extends Component {
	
	constructor(props) {
		super(props);
	}


	render() {		
		return (
			<NavbarView/>
		);
	}

}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Navbar = connect(
	mapStateToProps,
	mapDispatchToProps
)(NavbarContainer);

export default Navbar;