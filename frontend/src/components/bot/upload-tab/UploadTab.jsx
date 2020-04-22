import React, {Component} from 'react';
import {connect} from 'react-redux';
import UploadTabView from './UploadTabView.jsx'
import {uploadClip} from '../../../actions.js'

const initialState = {file: null, name: ""}

export class UploadTabContainer extends Component {
	
	constructor(props) {
		super(props);
		this.state=initialState;
	}


	onDrop(file){
		this.setState({...this.state, file: file});
		console.log(file);
	}

	onSubmit(event){
		const {file, name} = this.state;
		this.props.uploadClip(file, name);
		this.setState(initialState);
	}

	onTextChange(event){
		this.setState({...this.state, name: event.target.value});
	}

	resetFile(){
		this.setState({...this.state, file: null});
	}

	render() {		
		return (
			<UploadTabView 
				onDrop={this.onDrop.bind(this)} 
				onTextChange={this.onTextChange.bind(this)} 
				onSubmit={this.onSubmit.bind(this)}
				resetFile={this.resetFile.bind(this)}
				currentName={this.state.name}
				currentFile={this.state.file}
				
			/>
		);
	}
}


const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => ({
	uploadClip: (file,name) => dispatch(uploadClip(file,name)),
});

const UploadTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadTabContainer);

export default UploadTab;