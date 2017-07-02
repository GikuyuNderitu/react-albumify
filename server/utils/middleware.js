const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = function(app) {
	'use strict';
	app.use(cookieParser());
	app.use(parseAuth)
	app.use(express.static(path.join(__dirname,'/../../client/dist')));
	app.use(bodyParser.json());
	console.log('Middleware initialized');
};

const parseAuth = (res, req, next) => {
	next();
}
