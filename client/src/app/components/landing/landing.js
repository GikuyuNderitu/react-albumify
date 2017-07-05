import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { Home } from '../';

import { getAuthStatus } from '../../state/actions/authActions';

import styles from './landing.sass';

// class Landing extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {}
// 	}

// 	componentDidMount() {
// 		console.log("Landing Props", this.props);
// 	}

// 	render() {
// 		return (
// 			this.props.auth ?
				
			
// 		)
// 	}

// };

const Landing = ({auth, ...rest}) => (
	<Route {...rest} render={ props => (
		auth ?
			<Home /> :
			<div className={styles.container}>
			
				<h1>Here's the landing page</h1>
				{props.children}
			</div>

	)} />
)

export default Landing;