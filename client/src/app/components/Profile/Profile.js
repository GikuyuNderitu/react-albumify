import React, { Component } from 'react';

import shared from '../../shared-styles.sass'

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentWillMount() {
		console.log('hello');
	}
	render() {
		return (
			<div className={shared.midContainer}>
				<h1>This is the profile region</h1>

				<h2>Hi there</h2>
			</div>
		)
	}
}

export default Profile