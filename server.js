"use strict";
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || '1337';



const jwt = require('jsonwebtoken');


require('./server/utils/mongoose');
const authenticateRoutes = require('./server/controllers/auths').authenticate;

require('./server/utils/middleware')(app);

const users = require('./server/utils/routes').users
const auth = require('./server/utils/routes').auth

app.use('/users', users);
app.use('/authenticate', auth)

console.log('error thrown?');

app.get('/*', authenticateRoutes, (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'))
})


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
})