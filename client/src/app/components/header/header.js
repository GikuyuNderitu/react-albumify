import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

import styles from './header.sass';
import UserState from '../user-state/user-state';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<div className={styles.container}>
				<nav>
					<h1>Logo Goes Here</h1>
					<UserState />
				</nav>
			</div>
		)
	}
}

export default Header;