import React, { Component } from 'react';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: ''
		}
	}
	render() {
		return (
			<div>Welcome Home {this.state.userName}</div>
		)
	}
}

export default Home