import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';

import styles from './header.sass';
import UserState from '../user-state/user-state';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentWillMount() {
		console.log(this.props.isAuthenticated);
	}

	componentWillReceiveProps(next) {
		console.log('from header', next);
	}

	render() {
		return (
			<div className={styles.container}>
				<nav>
					<h1>Logo Goes Here</h1>
					<UserState authenticated={this.props.isAuthenticated} />
				</nav>
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {isAuthenticated: state.authenticationReducer.isAuthenticated}
}

export default Header;