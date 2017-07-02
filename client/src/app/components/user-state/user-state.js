import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
	}

	render() {
		return this.state.loggedIn ? (
			<ul>
				<li><NavLink activeClassName="active" to="/home">Home</NavLink></li>
				<li><NavLink activeClassName="active" to="/logout">Logout</NavLink></li>
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