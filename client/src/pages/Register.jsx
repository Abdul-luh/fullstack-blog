import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Register = () => {
	const [inputs, setInputs] = useState({
		username: null,
		email: null,
		password: null,
	});
	const [err, setErr] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await Axios.post("/auth/register", inputs).then((response) => {
				console.log(response);
			});
		} catch (error) {
			// console.log(error.response.data);
			setErr(error.response.data);
			setTimeout(() => {
				if (!error.response.data) navigate("/login");
			}, 2000);
		}
	};

	// console.log(inputs);
	return (
		<div className="formContainer">
			<h1 className="formHeader">Sign Up</h1>
			<form className="form" action="">
				<Link className="homeBtn" to={"/"}>
					{/* &larr;{" "} */}
				</Link>
				<input
					className="formInput"
					type="text"
					placeholder="username"
					name="username"
					required
					onChange={handleChange}
				/>
				<input
					className="formInput"
					type="email"
					placeholder="email"
					name="email"
					required
					onChange={handleChange}
				/>
				<input
					className="formInput"
					type="password"
					placeholder="password"
					name="password"
					required
					onChange={handleChange}
				/>
				<button onClick={handleSubmit} className="myBtn">
					Sign Up
				</button>
				{err && <p className="formErrMsg">{err}</p>}
				<span className="formSpan">
					Do you have an account?{" "}
					<Link className="formLink" to="/login">
						Login
					</Link>
				</span>
			</form>
		</div>
	);
};

export default Register;
