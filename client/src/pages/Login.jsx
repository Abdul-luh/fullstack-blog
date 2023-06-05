import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
// import Axios from "axios";

const Login = () => {
	const [inputs, setInputs] = useState({
		username: null,
		password: null,
	});
	const [err, setErr] = useState(null);

	const navigate = useNavigate();

	const { login } = useContext(AuthContext);

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(inputs);
			navigate("/");
		} catch (error) {
			// console.log(error.response.data);
			setErr(error.response.data);
		}
	};

	// console.log(inputs);
	return (
		<div className="formContainer">
			<h1 className="formHeader">Login</h1>
			<form className="form" action="">
				<Link className="homeBtn" to={"/"}>
					{/* &larr;{" "} */}
				</Link>
				<input
					className="formInput"
					type={"text" || "email"}
					placeholder="username / email"
					name={"username" || "email"}
					onChange={handleChange}
				/>
				<input
					className="formInput"
					type="password"
					placeholder="password"
					name="password"
					onChange={handleChange}
				/>
				<button onClick={handleSubmit} className="myBtn">
					Login
				</button>
				{err && <p className="formErrMsg">{err}</p>}
				<span className="formSpan">
					Don't you have an account?{" "}
					<Link className="formLink" to="/register">
						Register
					</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
