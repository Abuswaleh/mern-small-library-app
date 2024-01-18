const jwt = require("jsonwebtoken");

const getToken = (data, expireTimeHour = 24) => {
	return jwt.sign(
		data,
		process.env.SECRET_KEY
		// 	{
		// 	expireIn: expireTimeHour * 3600,
		// }
	);
};

module.exports = { getToken };
