import React, {Component} from 'react';
import './dropdown.css'

export default class DropdownItem extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="dropdown-item" onClick={this.props.onClick}>
                <span className="left-icon">{this.props.leftIcon}</span>
                {this.props.children}
                <span className="right-icon">{this.props.rightIcon}</span>
            </div>
        );
    }
}