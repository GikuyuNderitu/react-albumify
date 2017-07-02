"use strict";
const express = require('express');
const app = express();
const PORT = process.env.PORT || '1337';


const jwt = require('jsonwebtoken');


require('./server/utils/mongoose');

require('./server/utils/middleware')(app);

const auth = require('./server/utils/routes').auth

app.use('/users', auth);

// If the user has a token, send it to them
app.get("/", (req, res) => {
	const token = req.cookies.token;
	
	if(token) {
		
	}


})

app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'))
})


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
})