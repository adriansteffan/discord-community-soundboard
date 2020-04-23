import React from 'react';
import './settings-tab.css';
import Dropdown from '../dropdown/Dropdown';
import DropdownMenu from '../dropdown/DropdownMenu';
import DropdownItem from '../dropdown/DropdownItem';
import TextInput from '../basic/TextInput';
import SubmitButton from '../basic/SubmitButton';

export default ({
	availableGuildsRender,
	availableRolesRender,
	availableActionsRender,
	roleEditUID,
	roleEditRole,
	roleEditAction,
	activeGuild,
	activeRoles,
	onRoleEditUIDChange,
	onSubmit,
}) => {
	
	const guildMenuItems = []; 
	availableGuildsRender.forEach((item, index) => guildMenuItems.push(
		<DropdownItem onClick={item.onClick} key={index}>
			{item.name}	
		</DropdownItem>
	));
	
	const availableRolesItems = []; 
	availableRolesRender.forEach((item, index) => availableRolesItems.push(
		<DropdownItem onClick={item.onClick} key={index}>
			{item.name}	
		</DropdownItem>
	));

	const availableActionItems = []; 
	availableActionsRender.forEach((item, index) => availableActionItems.push(
		<DropdownItem onClick={item.onClick} key={index}>
			{item.name}	
		</DropdownItem>
	));


	return (
		<div className="settings-container">
			<div>
				<label>Current Guild</label>
				<Dropdown value={activeGuild.name}>
					<DropdownMenu>
						{guildMenuItems}
					</DropdownMenu>
				</Dropdown>
			</div>

			{ (activeRoles.includes("owner") || activeRoles.includes("moderator")) && (<div>
				<label>Edit Role</label>
				<div className="edit-role">
					<TextInput value={roleEditUID} placeholder="Discord UID" onChange={onRoleEditUIDChange}/>
					<Dropdown value={roleEditAction}>
						<DropdownMenu>
							{availableActionItems}
						</DropdownMenu>
					</Dropdown>
					<Dropdown value={roleEditRole}>
						<DropdownMenu>
							{availableRolesItems}
						</DropdownMenu>
					</Dropdown>
					<SubmitButton onClick={onSubmit}>Submit</SubmitButton>
				</div>
			</div>)}
		</div>
	);
};
          
            