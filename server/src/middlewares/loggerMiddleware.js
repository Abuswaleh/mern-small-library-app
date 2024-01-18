const logger = (req, res, next) => {
	const { baseUrl, originalUrl, userData } = req;
	console.log({ baseUrl, originalUrl, userData });
	next();
};

module.exports = { logger };
