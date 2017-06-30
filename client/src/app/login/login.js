import React, { Component } from 'react';

import Input from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { FormControl } from '../../material-forms';

import shared from '../shared-styles.sass';
import { user } from '../../utils/models';


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formValid: false,
			user: { email: user.email, password: user.password }
		}
	}

	handleChange(key, prev, newValue) {
		this.state.user[key].validate(newValue)

		this.dirtyCheckForm()
	}

	dirtyCheckForm() {
		let validForm = true;

		for(let val in this.state.user) {
			validForm = validForm && this.state.user[val].valid;
		}

		this.setState({formValid: validForm})
	}

	handleSubmit() {
		console.log("submitted");
	}

	render() {
		return (
			<div className={shared.midContainer}>
				<FormControl className={shared.bigForm} onSubmit={this.handleSubmit}>
					<h2>Login</h2>

					<Input 
						name="email"
						ref="email"
						floatingLabelText="Email"
						onChange={this.handleChange.bind(this, 'email')}
						errorText={this.state.user.email.err} />

					<Input 
						name="password"
						ref="userName"
						floatingLabelText="Password"
						onChange={this.handleChange.bind(this, 'password')}
						errorText={this.state.user.password.err} />

					<RaisedButton
						type="submit"
						className={shared.formSubmit}
						label="Submit" 
						disabled={!this.state.formValid} />

				</FormControl>
			</div>
		)
	}
}

export default Login;