"use strict";
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const sanitize = require('../utils').sanitizeUser

module.exports = {
	authenticate(req, res, next) {
		const token = req.cookies.token;

		console.log("token middleware hit");
		console.log("authenticate hit");
		
		if(token) {
			jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
				// Might cause bugs down the road if the user no longer exists or if token corrupted. Might want to push user to next after clearing token, will figure out logic later
				if(err) return res.status(401).json({error: 'Authentication error.'});

				User.findById(payload.id, (err, user) => {
					if(err) {
						res.clearCookie('token');
						return res.status(404).json({error: "User not found in database"});
					}

					return res.json(sanitize(user));
				})
				
			})
		} else {
			console.log('No token');
			res.status(404).json({error:"Authentication token not provided. Please login."})
		}
		

	},

	protect(req, res, next) {

	}
}