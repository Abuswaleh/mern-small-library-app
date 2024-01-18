const { connect } = require("mongoose");

connect(process.env.DB_URL)
	.then(() => console.log("Success: connected with DB"))
	.catch((error) => console.log(`Error: ${error.message}`));
