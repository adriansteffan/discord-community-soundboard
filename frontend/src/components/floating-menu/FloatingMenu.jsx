import React, {Component} from 'react';
import {connect} from 'react-redux';
import FloatingMenuView from './FloatingMenuView.jsx';
import { changeMode } from './../../actions.js'



export class FloatingMenuContainer extends Component {
	
	constructor(props) {
		super(props);
	}


	render() {		
		return (
			<FloatingMenuView onNextClick={this.props.next}/>
		);
	}

}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	next: () => {
		dispatch(changeMode());
	},
});

const FloatingMenu = connect(
	mapStateToProps,
	mapDispatchToProps
)(FloatingMenuContainer);

export default FloatingMenu;