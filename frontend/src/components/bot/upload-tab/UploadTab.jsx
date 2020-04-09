import React, {Component} from 'react';
import {connect} from 'react-redux';
import UploadTabView from './UploadTabView.jsx'




export class UploadTabContainer extends Component {
	
	constructor(props) {
		super(props);
	}

	

	render() {		
		return (
			<UploadTabView/>
		);
	}

}


const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => ({
});

const UploadTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadTabContainer);

export default UploadTab;