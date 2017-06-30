import React, { Component } from 'react';

import Input from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { FormControl } from '../../material-forms';
import shared from '../shared-styles.sass';

import { user } from '../../utils/models';

const validateName = newValue => {
	if (newValue.length < 3) return "I'm sorry, the first name must be greater than 3 letters";
	if (newValue[0] !== newValue[0].toUpperCase()) return "I'm sorry, the first letter of the first name must be capitalized.";
}

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formValid: false,
			user
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('submitted');

	}

	handleChange(key, prevState, newValue) {
		console.log(key, prevState);
		if(key === 'passwordConfirmation') this.state.user.passwordConfirmation.validate(newValue, this.state.user.password)
		else this.state.user[key].validate(newValue)

		this.dirtyCheckForm()
	}

	dirtyCheckForm() {
		let validForm = true;

		for(let val in this.state.user) {
			validForm = validForm && this.state.user[val].valid;
		}

		this.setState({formValid: validForm})
	}

	render() {
		return (
			<div className={shared.midContainer}>
				<FormControl onSubmit={this.handleSubmit.bind(this)} className={shared.bigForm}>
					<h1>Register</h1>
					<Input
						floatingLabelText="First Name"
						name="firstName"
						errorText={this.state.user.firstName.err}
						ref="firstName"
						onChange={this.handleChange.bind(this, "firstName")} />
					<Input
						floatingLabelText="Username" 
						name="userName"
						errorText={this.state.user.username.err}
						ref="username"
						onChange={this.handleChange.bind(this, "username")} />
					<Input
						floatingLabelText="Email" 
						name="email" 
						errorText={this.state.user.email.err}
						ref="email"
						onChange={this.handleChange.bind(this, "email")}/>
					<Input
						floatingLabelText="Password" 
						name="password"
						errorText={this.state.user.password.err}
						ref="password"
						onChange={this.handleChange.bind(this, "password")} />
					<Input
						floatingLabelText="Password Confirmation"
						name="passwordConfirmation" 
						errorText={this.state.user.passwordConfirmation.err}
						ref="passwordConfirmation"
						// disabled={this.st?ate.user.passwordConfirmation.disabledaf}
						onChange={this.handleChange.bind(this, "passwordConfirmation")}/>
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

export default Register