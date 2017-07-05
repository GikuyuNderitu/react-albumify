import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { logout } from '../../state/actions/authActions';
import { LOGOUT } from '../../state/actions/types';

class Logout extends Component {

	logout(e) {
		e.preventDefault();
		this.props.logout()
	}

	render() {
		return (
			<Link onClick={this.logout.bind(this)} to="/"> Logout </Link>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout() {
			logout()
			.then( data => {
				console.log(data);
				dispatch({type: LOGOUT})
			})
			.catch( err => {
				console.error('Hi there. failed to logout');
			})
		}
	}
}

export default connect(null, mapDispatchToProps )(Logout);