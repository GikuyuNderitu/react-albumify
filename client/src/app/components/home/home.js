import React, { Component } from 'react';

import shared from '../../shared-styles.sass';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: ''
		}
	}
	render() {
		return (
			<div className={shared.midContainer}> Home </div>
		)
	}
}

export default Home