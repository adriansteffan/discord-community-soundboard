import React, {Component} from 'react';
import {connect} from 'react-redux';
import YoutubeTabView from './YoutubeTabView.jsx';
import {playYoutube} from '../../../actions.js';



export class YoutubeTabContainer extends Component {
	
	constructor(props) {
		super(props);
		this.state={term: ""}
	}

	onTermTextChange(event){
		this.setState({...this.state, term: event.target.value});
	}

	onSubmit(){
		this.props.playYoutube(this.state.term);
		this.setState({...this.state, term: ""});
	}

	
	render() {		
		return (
			<YoutubeTabView
				onTermTextChange={this.onTermTextChange.bind(this)}
				onSubmit={this.onSubmit.bind(this)}
				currentTerm={this.state.term}
			/>
		);
	}
}


const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => ({
	playYoutube: (term) => dispatch(playYoutube(term)),
});

const YoutubeTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(YoutubeTabContainer);

export default YoutubeTab;