import React, { Component } from 'react';

class FormControl extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<form onSubmit={this.props.onSubmit} className={this.props.className}>
				{this.props.children}
			</form>
		)
	}
}

export default FormControl