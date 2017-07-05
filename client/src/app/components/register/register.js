import React, { Component } from 'react';

import { connect } from 'react-redux';

import Input from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { FormControl } from '../../material-forms';
import shared from '../../shared-styles.sass';

import { user } from '../../utils/models';

import { register } from '../../state/actions/authActions';
import { SIGNING_IN_ERROR, SIGNING_IN_SUCCESS } from '../../state/actions/types';


const validateName = newValue => {
	if (newValue.length < 3) return "I'm sorry, the first name must be greater than 3 letters";
	if (newValue[0] !== newValue[0].toUpperCase()) return "I'm sorry, the first letter of the first name must be capitalized.";
}

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formValid: false,
			user,
			newUser: {}
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('submitted');
		
		this.props.attemptRegistry(this.state.newUser)
	}

	handleChange(key, prevState, newValue) {
		// console.log(key, prevState);
		// Check to see if value is valid

		let valid;
		if(key === 'passwordConfirmation') valid = this.state.user.passwordConfirmation.validate(newValue, this.state.user.password);
		else valid = this.state.user[key].validate(newValue);

		const newUser = {...this.state.newUser };

		console.log(newUser);

		if(valid) {
			newUser[key] = newValue;
			this.setState({newUser: newUser})
		}

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
						disabled={!this.state.formValid}
						onClick={this.handleSubmit.bind(this)} />
				</FormControl>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		attemptRegistry(body) {
			register(body)
			.then(data=> {
				console.log("Register Event occurred and succeeded!", data);
				dispatch({type: SIGNING_IN_SUCCESS, payload: data})
				// props.history.push('/home')
			})
			.catch(err => {
				console.error("Registration event occurred and failed :(.", err);
				dispatch({type: SIGNING_IN_ERROR, payload: err})
				console.log(props);
			})
		}
	}
}

export default connect(null, mapDispatchToProps)(Register);