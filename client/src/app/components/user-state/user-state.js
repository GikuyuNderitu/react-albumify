import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from '../';

import './user-state.sass';

class UserState extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		};
	}

	componentDidMount (){
		// Check to see if user is logged in and set the logged in state
		// console.log('from user-state component',this.props);
	}

	render() {
		return this.props.authenticated ? (
			<ul>
				<li><NavLink activeClassName="active" to="/home">Home</NavLink></li>
				<li><Logout /></li>
			</ul>
		) : (
			<ul>
				<li><NavLink exact activeClassName="active" to="/">Welcome</NavLink></li>
				<li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
				<li><NavLink activeClassName="active" to="/signup">Register</NavLink></li>
			</ul>
		)
	}
}

export default UserState;