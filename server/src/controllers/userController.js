const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/token");

const createUser = async (req, res) => {
	const { password } = req.body;

	if (password) {
		const hashedPassword = bcrypt.hashSync(password, 10);
		const userData = { ...req.body, password: hashedPassword };

		try {
			const { name, email, _id, isCreator } = await userModel.create(
				userData
			);

			const token = getToken({ _id });
			res.status(201).json({
				status: "success",
				data: { name, email, _id, isCreator, token },
			});
		} catch (error) {
			res.status(400).json({
				status: "failed",
				// can be any error,
				message: "user already exist",
				// message: error.message,
			});
		}
	} else {
		res.status(400).json({
			status: "failed",
			message: "password not provided",
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const userData = await userModel.findOne({ email });

		if (userData) {
			const isPasswordMatched = bcrypt.compareSync(
				password,
				userData.password
			);

			if (isPasswordMatched) {
				const { name, email, _id, isCreator } = userData;
				const token = getToken({ _id });

				res.status(200).json({
					status: "success",
					data: { name, email, _id, isCreator, token },
				});
			} else {
				res.status(400).json({
					status: "failed",
					message: "wrong password",
				});
			}
		} else {
			res.status(400).json({
				status: "failed",
				message: "user not found",
			});
		}
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

module.exports = { createUser, loginUser };
