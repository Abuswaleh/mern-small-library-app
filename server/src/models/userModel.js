const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		lowercase: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		//basic mail validation
		match: /^\S+@\S+\.\S+$/,
	},
	password: {
		type: String,
		required: true,
		minLength: 4,
	},
	isCreator: {
		type: Boolean,
		default: false,
	},
});

module.exports = model("users", userSchema);
