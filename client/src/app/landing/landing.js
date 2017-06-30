import React, { Component } from 'react';

import styles from './landing.sass';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className={styles.container}>
				<h1>Here's the lading page</h1>
				{this.props.children}
			</div>
		)
	}

};

export default Landing;