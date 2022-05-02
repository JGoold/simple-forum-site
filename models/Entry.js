// Database Design

const mongoose = require("mongoose")

// schema here
const EntrySchema = new mongoose.Schema({
	textValue: {
		type: String,
		required: [true, "must provide a value"],
		trim: true
	},
	nameValue: {
		type: String,
		required: [true, "must provide a name"],
		trim: true,
		maxlength: [20, "name cannot exceed 20 characters"]
	},
	date: {
		type: String
	},
	edited: {
		type: String,
		default: ""
	},
	category: {
		type: String
	}
})

// export the schema as a model
module.exports = mongoose.model("Entry", EntrySchema)
