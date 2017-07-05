const EMAIL_REGEX = /^[a-zA-Z\d\#\.\-]{3,}@[a-zA-Z\-]{3,}\.[a-zA-Z]{2,6}$/i
const NAME_REGEX = /^[a-zA-Z']{3,}$/i
const USERNAME_REGEX = /^[a-zA-Z\d']{3,}$/i
const PASSWORD_REGEX = /^[a-zA-Z\d\-\?\!\#\.\^\<\>\$\;]{8,64}$/i

const invalidate = (message, obj) => {
	obj.valid = false;
	obj.err = message;
	return false;
}

export default {
	firstName: {
		value: "",
		valid: false,
		validate(newVal) {
			if(!newVal) invalidate("Name is required", this);
			else if(newVal.length < 3) invalidate("First name must be 3 or more letters", this);
			else if (!newVal.match(NAME_REGEX)) invalidate(`First name must only be letters and the apostrophe ( ' ) `, this);
			else { 
				this.err = "";
				this.value = newVal;
				this.valid = true;
				return true;
			}
		},
		err: ''
	},
	username: {
		value: "",
		valid: false,
		validate(newVal) {
			if(!newVal) invalidate("Username is required", this);
			if(!newVal.match(USERNAME_REGEX)) invalidate('Username must be 3 or more letters.', this);
			else {
				this.err = '';
				this.value = newVal;
				this.valid = true;
				return true;
			}
		},
		err: ''
	},
	email: {
		value: "",
		valid: false,
		validate(newVal) {
			if(!newVal) invalidate("Email is required", this);
			else if(!newVal.match(EMAIL_REGEX)) invalidate("Invalid email address.", this);
			else { 
				this.err = "";
				this.value = newVal;
				this.valid = true;
				return true;
			}
		},
		err: ''
	},
	password: {
		value: "",
		valid: false,
		validate(newVal) {
			if(!newVal) invalidate("Password is required", this);
			else if(!newVal.match(PASSWORD_REGEX)) invalidate("Invalid Password", this);
			else { 
				this.err = "";
				this.value = newVal;
				this.valid = true;
				return true;
			}
		},
		err: ''
	},
	passwordConfirmation: {
		value: "",
		valid: false,
		validate(newVal, password) {
			if(!password.valid) return invalidate("Please first enter a valid password", this);
			if(!newVal) invalidate("Password confirmation is required", this);
			else if(newVal !== password.value) invalidate("Password Confrimation field and password do not match", this);
			else { 
				this.err = "";
				this.value = newVal;
				this.valid = true;
				return true;
			}
		},
		disabled: true,
		err: ''
	}
}