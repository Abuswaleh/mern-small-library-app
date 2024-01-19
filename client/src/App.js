import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./containers/Login";
import { Home } from "./containers/Home";

function App() {
	return (
		<div className="app-container">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
