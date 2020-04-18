import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavbarView from './NavbarView.jsx'
import {changeTab} from './../../../actions.js'


export class NavbarContainer extends Component {
	
	constructor(props) {
		super(props);
	}


	render() {		
		return (
			<NavbarView changeTab={this.props.changeTab}/>
		);
	}

}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
	changeTab: (tab) => dispatch(changeTab(tab)),
});

const Navbar = connect(
	mapStateToProps,
	mapDispatchToProps
)(NavbarContainer);

export default Navbar;