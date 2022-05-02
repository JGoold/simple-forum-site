// Mongoose connecting to the database

const mongoose = require("mongoose")

function connectDB(url) {
	return mongoose.connect(url)
}

module.exports = connectDB
