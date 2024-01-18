const bookModel = require("../models/bookModel");
const mongoose = require("mongoose");

const isValidBookId = (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
		res.status(400).json({
			status: "failed",
			message: "invalid bookId",
		});
		return false;
	}
	return true;
};
const isAuthorize = (req, res, msg) => {
	if (!req.userData.isCreator) {
		res.status(400).json({
			status: "failed",
			message: `you are not authorize to ${msg} books`,
		});
		return false;
	}
	return true;
};

const getTimeThreshold = (query) => {
	const currentTime = new Date();
	if (query["mingap"] && parseInt(query["mingap"])) {
		return new Date(currentTime - parseInt(query["mingap"] * 60 * 1000));
	} else {
		return new Date(currentTime - 10 * 60 * 1000);
	}
};
const getFilterQuery = (query) => {
	let isNew = false;

	if (
		(query["new"] && parseInt(query["new"]) === 1) ||
		(query["old"] && parseInt(query["old"]) === 0)
	) {
		isNew = true;
	} else if (
		(query["old"] && parseInt(query["old"]) === 1) ||
		(query["new"] && parseInt(query["new"]) === 0)
	) {
		isNew = false;
	} else {
		return {};
	}

	return {
		createdAt: { [isNew ? "$gte" : "$lte"]: getTimeThreshold(query) },
	};
};

const bookList = async (req, res) => {
	const filterQuery = getFilterQuery(req.query);
	try {
		const bookList = await bookModel.find({ ...filterQuery });

		res.status(200).json({
			status: "success",
			data: bookList,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const createBook = async (req, res) => {
	// is user authorize as creator
	if (!isAuthorize(req, res, "create")) return;

	const { title, author } = req.body;

	try {
		const bookData = await bookModel.create({ title, author });

		res.status(200).json({
			status: "success",
			message: "book uploaded successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const readBook = async (req, res) => {
	// additional check for invalid objectID
	if (!isValidBookId(req, res)) return;

	const { bookId } = req.params;

	try {
		const bookData = await bookModel.findById(bookId);

		if (bookData) {
			res.status(200).json({
				status: "success",
				data: bookData,
			});
		} else {
			res.status(400).json({
				status: "failed",
				message: "book not found",
			});
		}
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const updateBook = async (req, res) => {
	// is user authorize as creator
	if (!isAuthorize(req, res, "update")) return;

	// additional check for invalid objectID
	if (!isValidBookId(req, res)) return;

	const { bookId } = req.params;
	const bookDataUpdate = req.body;
	try {
		const bookData = await bookModel.findByIdAndUpdate(
			bookId,
			{
				$set: bookDataUpdate,
			},
			{ new: true }
		);

		if (bookData) {
			res.status(200).json({
				status: "success",
				data: bookData,
			});
		} else {
			res.status(400).json({
				status: "failed",
				message: "book not found",
			});
		}
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const deleteBook = async (req, res) => {
	// is user authorize as creator
	if (!isAuthorize(req, res, "delete")) return;

	// additional check for invalid objectID
	if (!isValidBookId(req, res)) return;

	const { bookId } = req.params;
	try {
		const bookData = await bookModel.findByIdAndDelete(bookId);

		if (bookData) {
			res.status(200).json({
				status: "success",
				data: "book deleted successfully",
			});
		} else {
			res.status(400).json({
				status: "failed",
				message: "book not found",
			});
		}
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

module.exports = { bookList, createBook, readBook, updateBook, deleteBook };
