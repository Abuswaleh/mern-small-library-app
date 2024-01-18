const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

//connect with mongodb
require("./connectWithDB");

//server listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
