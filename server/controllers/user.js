import { db } from "../db.js";
import Jwt from "jsonwebtoken";

export const uploadProfile = (req, res) => {
	const token = req.cookies.access_token;
	if (!token) return res.status(401).json("Not Authenticated");

	Jwt.verify(token, "jwtkey", (err, userInfo) => {
		if (err) return res.status(403).json("token is not valid");
		const values = [req.body.img, req.params.id];
		console.log(values);

		const q = "UPDATE users SET img = ? WHERE id = ?";

		db.query(q, [...values], (error, result) => {
			if (error) return res.status(500).json(error), console.log(error);

			res.json("Profile Updated");
		});
	});
};

export const getUserProfile = (req, res) => {
	const id = req.params.id;
	const q = "SELECT img AS userImg FROM users WHERE id = ?";
	db.query(q, [id], (err, data) => {
		if (err) res.status(500).json(err);
		res.json(data[0].userImg);
	});
};
