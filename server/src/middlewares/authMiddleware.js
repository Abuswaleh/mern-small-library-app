const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authValidation = async (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		const token = authorization.split(" ")[1];
		try {
			const userInfo = jwt.verify(token, process.env.SECRET_KEY);
			// extra step to verify if users exist in DB
			const userData = await userModel.findById(userInfo._id);

			if (!userData) throw new Error("user not found");
			req.userData = userData;
			next();
		} catch (error) {
			res.status(400).json({
				status: "failed",
				message: error.message,
			});
		}
	} else {
		res.status(400).json({
			status: "failed",
			message: "please login first",
		});
	}
};

module.exports = authValidation;
