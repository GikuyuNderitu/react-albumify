import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Input extends TextField {
	constructor({validate, validator, ...props}) {
		super(props);
		this.state = {
			validate: props.validate,
			valid: true
		}

		this.validate = props.validator ? props.validator.bind(this) : this.validate.bind(this);
	}

	onChange(myFunc) {
		super.onChange(myFunc)
	}

	validate() {
		console.log('hello')
		return '';
	}

	render() {
		return super.render();
	}
}

export default Input;