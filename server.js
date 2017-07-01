"use strict";
const express = require('express');
const app = express();
const PORT = process.env.PORT || '1337';


require('./server/utils/mongoose');

require('./server/utils/middleware')(app);

const auth = require('./server/utils/routes').auth

app.use('/users', auth);

app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'))
})


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
})