'use strict';
/*
	Extra validation options:
	https://www.npmjs.com/package/mongoose-validators
	https://www.npmjs.com/package/mongoose-beautiful-unique-validation
*/
const mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	uniqueness = require('mongoose-beautiful-unique-validation'),
	saltRounds = 14,
	Schema = mongoose.Schema,
	EMAIL_REGEX = /^[a-z0-9;.'/!#$^*()]{2,}@.{2,}\..{2,}$/i,
	PASSWORD_REGEX = /^.{8,}$/,
	UserSchema = new Schema({
		firstNname: {
			type: String,
			required: [true, "First Name is required"],
			trim: true
		},
		password:{
			type: String,
			required: [true, "Password field is required"],
			minlength: [8, "I'm sorry, the password is shorter than the required length (8 characters)"],
			validate: [{
				validator: function (pass) {
					return PASSWORD_REGEX.test(pass);
				},
				message: "`{ VALUE }` is not a valid password"
			},{
				validator: function (pass) {
					return pass === this.password_confirmation
				},
				message: "The password and password confirmation don't match"
			}]
		}
	},{
		timestamps:{
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	})

UserSchema.methods.login = function (password) {
	const self = this
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, self.password)
		.then( res => {
			if(!res) reject("I'm sorry, that password is not correct.")
			else resolve()
		})
	})
}

UserSchema.pre('save', function (next) {
	let self = this
	bcrypt.hash(self.password, saltRounds)
	.then( hash => {
		self.password = hash
		next();
	})
})

UserSchema.plugin(uniqueness)

mongoose.model('User', UserSchema)
