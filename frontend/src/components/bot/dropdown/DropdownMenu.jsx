import React, {Component} from 'react';
import './dropdown.css'

export default class DropdownMenu extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="dropdown-menu">
                {this.props.children}
            </div>
        );
    }
}