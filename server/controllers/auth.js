"use strict"
const User = require('mongoose').model('User'); 

module.exports = {
	create(req, res) {
		console.log('create route hit');
		res.json("Create route hit")
	},
	login(req, res) {
		console.log('login route hit');		
		res.json("Login route hit")
	}
}