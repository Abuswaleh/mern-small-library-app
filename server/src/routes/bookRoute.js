const express = require("express");
const router = express.Router();

const {
	bookList,
	createBook,
	readBook,
	updateBook,
	deleteBook,
} = require("../controllers/bookController");

router.get("/", bookList);
router.post("/create", createBook);
router.get("/read/:bookId", readBook);
router.patch("/update/:bookId", updateBook);
router.delete("/delete/:bookId", deleteBook);

module.exports = router;
