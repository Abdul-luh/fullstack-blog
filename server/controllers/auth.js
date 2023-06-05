import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
	//CHECK EXISTING USER
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;

	if (username === null || username === "") {
		return res.status(500).json("please input a username");
	}
	if (email === null) {
		return res.status(500).json("please input an email");
	}
	if (password === null) {
		return res.status(500).json("please input a password");
	}

	const q = "SELECT * FROM users WHERE email = ? OR username = ?";
	db.query(q, [email, username], (err, result) => {
		if (err) return res.status(500).json(err);
		if (result.length) return res.status(409).json("User already Exists");

		//hash the password and create a user
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";

		const values = [username, email, hash];
		db.query(q, [values], (error, data) => {
			if (error) res.json(error);
			return res.status(200).json("User created");
		});
	});
	console.log(req.method, "register", username, email);
};

export const login = (req, res) => {
	// 	CHECK IF USER EXISTS
	const username = req.body.username;

	if (username === null)
		return res.status(403).json({ msg: "please input an username" });

	const q = "SELECT * FROM users WHERE username = ? OR email = ?";

	db.query(q, [username, username], (err, result) => {
		if (err) res.json(err);
		if (result.length === 0) return res.status(404).json("No user found!");

		// COMPARE HASH PASSWORD WITH THE INPUT PASSWORD
		const pswd = req.body.password;
		const isPasswordCorrect = bcrypt.compareSync(pswd, result[0].password);
		if (!isPasswordCorrect)
			return res.status(400).json("Wrong username or password");

		const { password, ...others } = result[0];

		const token = jwt.sign({ id: result[0].id }, "jwtkey");
		res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json(others);
	});
	console.log(req.method, "Login", username);
};

export const logout = (req, res) => {
	res
		.clearCookie("access_token", {
			sameSite: "none",
			secure: true,
		})
		.status(200)
		.json("User logged out!");
};
