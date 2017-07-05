"use strict"
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const sanitize = require('../utils').sanitizeUser;


const JWT_SECRET = require('../utils/config').JWT_SECRET;

module.exports = {
	create(req, res) {
		console.log('create route hit');
		// console.log(req.cookie);
		console.log(req.cookies.token);

		let body = req.body;
		let user = new User(body);
		console.log(`passwordConfirmation: ${body.passwordConfirmation}\n`);
		user.password_confirmation = body.passwordConfirmation
		user.save((err, user) => {
			console.log('hello hit save call back');
			if(err) {
				return res.status(401).json({errors:err.errors, user: body})
			}

			const token = jwt.sign({
				id: user._id,
				username: user.username,
				firstName: user.firstName
			}, JWT_SECRET);

			res.clearCookie('token');
			res.cookie('token', token, {maxAge: 1000*86400*30, httpOnly: true})


			return res.json({id: user._id, name: user.username});
		})
	},
	login(req, res) {
		console.log('login route hit');
		let body = req.body
		let email = body.email;
		let password = body.password;

		if(!email || !password) return res.json({errors: {incomplete:"Please fill out the email and password fields"}})

		User.findOne({email: email}, (err, user) => {
			if (user) {
				user.login(password)
				.then( valid => {
					const token = jwt.sign({
						id: user._id,
						username: user.username,
						firstName: user.firstName
					}, JWT_SECRET);

					res.clearCookie('token');
					res.cookie('token', token, {maxAge: 1000*86400*30, httpOnly: true})


					return res.json(sanitize(user))
				})
				.catch( err => {
					console.error(err)
					delete body.password
					return res.status(404).json({errors: {password: err}, user: body})
				})
			}else{
				return res.status(404).json({errors: {email:`The email '${email}' was not found in our records.`}})
			}
		})
	},
	logout(req, res) {
		res.clearCookie('token');
		res.status(203).json({success: "Successfully cleared the token"})
	},
	removeAll(req, res) {
		console.log('remove all route hit');

		User.remove({}, (err, users) => {
			if (err) return res.status(500).json({error: "Something wrong happened."});
			return res.status(204).json({succes: "Users removed"});
		})
	}
}