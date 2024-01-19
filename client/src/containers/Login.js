import { useState } from "react";
import { useStore } from "../context/DataProvider";
import { loginApi, signupApi } from "../context/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, dispatch } = useStore();
	const navigate = useNavigate();
	// useEffect(() => {
	if (store.userData.token) navigate("/");
	// }, []);

	const [isLogin, setIsLogin] = useState(true);
	const [authError, setAuthError] = useState(false);

	function handleLoginState() {
		setIsLogin((p) => !p);
		setAuthError(false);
	}
	function handleLogin(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const userData = {
			email: formData.get("email"),
			password: formData.get("password"),
		};
		setAuthError(false);
		loginApi(userData).then((data) => {
			if (data.state) {
				dispatch({ type: "USERDATA", payload: data.data });
				navigate("/");
			} else {
				setAuthError(data.data.message);
			}
		});
	}
	function handleSignup(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const userData = {
			name: formData.get("name"),
			email: formData.get("email"),
			password: formData.get("password"),
			isCreator: formData.get("role") === "CREATOR",
		};
		setAuthError(false);
		signupApi(userData).then((data) => {
			if (data.state) {
				dispatch({ type: "USERDATA", payload: data.data });
				navigate("/");
			} else {
				setAuthError(data.data.message);
			}
		});
	}

	return (
		<div className="container login">
			<h1>Welcome to Library App</h1>
			{isLogin ? (
				<form onSubmit={handleLogin}>
					<h2>Login</h2>
					<div className="gridForm">
						<label>Email</label>
						<input
							key="emailLogin"
							name="email"
							type="email"
							required
						/>
						<label>Password</label>
						<input
							key="passwordLogin"
							name="password"
							type="password"
							minLength={5}
							required
						/>
					</div>
					<div className="flexCol">
						<p className="error">{authError}</p>
						<button>Login</button>
						<div>
							Dont have account?{" "}
							<span onClick={handleLoginState}>Signup</span>
						</div>
					</div>
				</form>
			) : (
				<form onSubmit={handleSignup}>
					<h2>Signup</h2>
					<div className="gridForm">
						<label>Full Name</label>
						<input
							key="name"
							name="name"
							type="text"
							minLength={3}
							required
						/>
						<label>Email</label>
						<input key="email" name="email" type="email" required />
						<label>Password</label>
						<input
							key="pasword"
							name="password"
							type="password"
							minLength={5}
							required
						/>
						<label>Role</label>
						<select name="role">
							<option>VIEW_ALL</option>
							<option>CREATOR</option>
						</select>
					</div>
					<div className="flexCol">
						<p className="error">{authError}</p>
						<button>Signup</button>
						<div>
							Dont have account?{" "}
							<span onClick={handleLoginState}>Login</span>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};
