import React, { Component } from 'react';

import { connect } from 'react-redux';

import Input from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { FormControl } from '../../material-forms';

import shared from '../../shared-styles.sass';
import { user } from '../../utils/models';
import { login } from '../../state/actions/authActions';
import { SIGNING_IN_SUCCESS, SIGNING_IN_ERROR } from '../../state/actions/types';


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formValid: false,
			user: { email: user.email, password: user.password },
			newUser: {email:"", password:""}
		}
	}

	handleChange(key, prev, newValue) {
		const valid = this.state.user[key].validate(newValue);

		if(valid) {
			const newUser = {...this.state.newUser};
			newUser[key] = newValue;
			this.setState({newUser})
		}
		const newUser = {...this.state.newUser};

		this.dirtyCheckForm()
	}

	dirtyCheckForm() {
		let validForm = true;

		for(let val in this.state.user) {
			validForm = validForm && this.state.user[val].valid;
		}

		this.setState({formValid: validForm})
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("submitted");
		console.log(this.state.newUser);
		this.props.login(this.state.newUser);
	}

	render() {
		return (
			<div className={shared.midContainer}>
				<FormControl className={shared.bigForm} onSubmit={this.handleSubmit.bind(this)}>
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

const mapDispatch = (dispatch, props) => {
	return {
		login(body) {
			login(body)
				.then(data => {
					console.log(data);
					dispatch({type: SIGNING_IN_SUCCESS, payload: data});
					props.history.push('/')
				})
				.catch(err => {
					console.log(err);
					dispatch({type: SIGNING_IN_ERROR, payload: err})
				})
		}
	}
}

export default connect(null, mapDispatch)(Login);