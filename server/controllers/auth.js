"use strict"
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User'); 

const JWT_SECRET = 'GABBLEDEEDGOOKISGABLEDEEGOTANDiHAVETOFARTSOMETHINGFARCE';

module.exports = {
	create(req, res) {
		console.log('create route hit');
		console.log(req.body);

		let body = req.body;
		let user = new User(body);
		console.log(`passwordConfirmation: ${body.passwordConfirmation}`);
		user.password_confirmation = body.passwordConfirmation
		user.save((err, user) => {
			console.log('hello hit save call back');
			if(err) {
				console.log(err);
				return res.status(401).json({errors:err.errors, user: body})
			}
			console.log(user._id);
			console.log(user.firstName);

			const token = jwt.sign({
				id: user._id,
				username: user.username,
				firstName: user.firstName
			}, JWT_SECRET);

			console.log(req.cookies);
			res.cookie('token', token, {maxAge: 1000*86400*30, httpOnly: true})
			console.log(res.cookie);

			console.log(req.headers);

			// res.cookies.Authentication

			return res.json({id: user._id, name: user.username});
		})
	},
	login(req, res) {
		console.log('login route hit');
		let body = req.body
		console.log(body);
		let email = body.email;
		let password = body.password;

		if(!email || !password) return res.json({errors: {incomplete:"Please fill out the email and password fields"}})

		User.findOne({email: email}, (err, obj) => {
			if (obj) {
				obj.login(password)
				.then( valid => {
					console.log(obj);
					return res.json({id:obj._id, name: obj.name})
				})
				.catch( err => {
					console.log(err);
					delete body.password
					return res.json({errors: {password: err}, obj: body})
				})
			}else{
				console.log('log',err);
				return res.json({errors: {email:`The email '${email}' was not found in our records.`}})
			}
		})
	},
	removeAll(req, res) {
		console.log('remove all route hit');

		User.remove({}, (err, users) => {
			if (err) return res.status(500).json({error: "Something wrong happened."});
			return res.status(204).json({succes: "Users removed"});
		})
	} 
}