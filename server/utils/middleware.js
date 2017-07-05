const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

module.exports = function(app) {
	'use strict';
	app.use(cookieParser());
	// app.use(parseAuth)
	app.use(logger('dev'));
	app.use(express.static(path.join(__dirname, '/../../client/dist')));
	app.use(favicon(path.resolve(__dirname, '..', '..', 'favicon.ico')));
	app.use(bodyParser.json());
	console.log('Middleware initialized');
};

const parseAuth = (res, req, next) => {
	next();
}
