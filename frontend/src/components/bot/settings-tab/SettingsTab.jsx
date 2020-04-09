import React, {Component} from 'react';
import {connect} from 'react-redux';
import SettingsTabView from './SettingsTabView.jsx'




export class SettingsTabContainer extends Component {
	
	constructor(props) {
		super(props);
	}

	

	render() {		
		return (
			<SettingsTabView/>
		);
	}

}


const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => ({
});

const SettingsTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsTabContainer);

export default SettingsTab;