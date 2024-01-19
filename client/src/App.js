// import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./containers/Login";
import { Home } from "./containers/Home";
import { useStore } from "./context/DataProvider";

function App() {
	const {
		store: { userData },
	} = useStore();
	return (
		<div className="app-container">
			{/* <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes> */}
			{userData.token ? <Home /> : <Login />}
		</div>
	);
}

export default App;
