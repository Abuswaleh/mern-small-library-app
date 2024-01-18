const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			minLength: 3,
			lowercase: true,
			trim: true,
		},
		author: {
			type: String,
			required: true,
			minLength: 3,
			lowercase: true,
			trim: true,
		},
		// uploadedAt: {
		// 	type: Date,
		// 	default: Date.now,
		// },
	},
	{ timestamps: true }
);

module.exports = model("books", bookSchema);
