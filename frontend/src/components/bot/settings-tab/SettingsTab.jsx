import React, {Component} from 'react';
import {connect} from 'react-redux';
import SettingsTabView from './SettingsTabView.jsx';
import {setCurrentGuild, editRole} from '../../../actions.js';



export class SettingsTabContainer extends Component {
	
	constructor(props) {
		super(props);
		this.state = {roleEditUID: "", roleEditAction: "", roleEditRole: ""}; 
	}

	guildMenuRenderData(rawGuild){
		return {
			name: rawGuild.name,
			onClick: (e) => this.props.setGuild(rawGuild),
		}
	}

	availableRoleRenderData(role){
		return {
			name: role,
			onClick: (e) => this.setState({...this.state, roleEditRole: role}),
		}
	}

	availableActionRenderData(action){
		return {
			name: action,
			onClick: (e) =>  this.setState({...this.state, roleEditAction: action}),
		}
	}

	onRoleEditUIDChange(event){
		this.setState({...this.state, roleEditUID: event.target.value});
	}

	onSubmit(){
		this.props.editRole(this.state.roleEditUID, this.state.roleEditAction, this.state.roleEditRole);
		this.setState({...this.state, roleEditUID: ""});
	}

	render() {

		const {
			activeGuild,
			activeRoles,
			availableGuilds,
		} = this.props;

		const availableGuildsRender  = availableGuilds.map(this.guildMenuRenderData.bind(this));
		const availableRolesRender  = ["minimal","basic","uploader","moderator"].map(this.availableRoleRenderData.bind(this));
		const availableActionsRender  = ["assign", "remove"].map(this.availableActionRenderData.bind(this));
		
		return (
			<SettingsTabView
				availableGuildsRender={availableGuildsRender}
				availableRolesRender={availableRolesRender}
				availableActionsRender={availableActionsRender}
				roleEditUID={this.state.roleEditUID}
				roleEditAction={this.state.roleEditAction}
				roleEditRole={this.state.roleEditRole}
				activeGuild={activeGuild}
				activeRoles={activeRoles}
				onRoleEditUIDChange={this.onRoleEditUIDChange.bind(this)}
				onSubmit={this.onSubmit.bind(this)}
			/>
		);
	}

}


const mapStateToProps = (state) => ({
	activeGuild: state.currentInformation.guild,
	activeRoles: state.backendData.payload.roles,
	availableGuilds: state.backendData.payload.guilds,
});

const mapDispatchToProps = (dispatch) => ({
	setGuild: (guild) => dispatch(setCurrentGuild(guild)),
	editRole: (uid, action, role) => dispatch(editRole(uid, action, role)),
});

const SettingsTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsTabContainer);

export default SettingsTab;