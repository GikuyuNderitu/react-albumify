const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Connect to mongoose, Overwrite mpromise, mongoose's deprecated promise implementation
const DBNAME = 'albumify'

const URIstring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || `mongodb://localhost/${DBNAME}`
mongoose.connect(URIstring, (err, res) => {
	if (err) {
		console.error(`ERROR connecting to: ${URIstring}`);
	} else {
		console.log(res);
		console.log(`Successful connection to ${URIstring}`);
	}
})

if(DBNAME) console.log(`Connected to ${DBNAME}`);
else console.error(`MONGOOSE REQUIRED \nBUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUT\n CONNECT TO THE DATABASE!`);
mongoose.Promise = global.Promise

let models_path = path.join(__dirname, './../models')
console.log(models_path);
fs.readdirSync(models_path).forEach(function (file) {
	if(file.indexOf('.js') >= 0){
		console.log(models_path+'/'+file);
		require(models_path+'/'+file)
	}
})
