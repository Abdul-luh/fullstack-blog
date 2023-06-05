import { db } from "../db.js";
import Jwt from "jsonwebtoken";

export const getAllPosts = (req, res) => {
	const cat = req.query.cat;
	const q = cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts";

	db.query(q, [cat], (err, result) => {
		if (err) res.status(500).json(err);

		res.status(200).json(result);
	});
};

export const getMyPosts = (req, res) => {
	// const userid = req.body.userid;
	const userid = req.params.id;
	const q = "SELECT * FROM posts WHERE uid = ?";
	db.query(q, [userid], (err, result) => {
		if (err) return res.status(500).json(err);
		res.status(200).json(result);
	});
	console.log(req.method, "my Posts by my id =", userid);
};

export const getOnePost = (req, res) => {
	const id = req.params.id;
	const q =
		"SELECT `username`, `title`, `desc`, p.id, p.lastupdated AS lastDate, p.img, u.img AS userProfile, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

	db.query(q, [id], (error, result) => {
		if (error) return res.status(500).json(error);
		res.status(200).json(result[0]);
	});

	console.log(req.method, "single Posts by post id =", id);
};

export const addPost = (req, res) => {
	const token = req.cookies.access_token;
	if (!token) return res.status(401).json("Not Authenticated!");

	Jwt.verify(token, "jwtkey", (err, userInfo) => {
		if (err) return res.status(403).json("token is not valid!");
		const values = [
			req.body.title,
			req.body.desc,
			req.body.cat,
			req.body.img,
			req.body.date,
			userInfo.id,
			req.body.lastupdated,
		];
		// console.log(req.body.img);

		const q =
			"INSERT INTO posts(`title`, `desc`, `cat`, `img`, `date`, `uid`, `lastupdated`) VALUES (?)";
		db.query(q, [values], (error, response) => {
			if (error) {
				console.log(error);
				return res.status(500).json(error);
			}
			res.json("Post created!");
		});
	});

	console.log(req.method, "new Post");
};

export const updatePost = (req, res) => {
	const token = req.cookies.access_token;
	if (!token) return res.status(401).json("Not Authenticated");

	Jwt.verify(token, "jwtkey", (err, userInfo) => {
		if (err) return res.status(403).json("token is not valid!");

		const values = [
			req.body.title,
			req.body.desc,
			req.body.cat,
			req.body.img,
			req.body.lastupdated,
		];
		console.log(req.body.img);
		const q =
			"UPDATE posts SET `title` = ?, `desc` = ?, `cat` = ?, `img` = ?, `lastupdated`  = ? WHERE `id` = ? AND `uid` = ?";
		db.query(q, [...values, req.params.id, userInfo.id], (error, result) => {
			console.log(error);
			if (error) return res.status(500).json(error);
			res.json("Post Updated");
		});
	});
	console.log(req.method, "updated Post");
};

export const deletePost = (req, res) => {
	const token = req.cookies.access_token;
	if (!token) return res.status(401).json("Not Authenticated!");

	Jwt.verify(token, "jwtkey", (err, userInfo) => {
		if (err) return res.status(403).json("token is not valid!");

		const postId = req.params.id;
		const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
		// console.log(postId);

		db.query(q, [postId, userInfo.id], (error, result) => {
			if (error) return res.status(403).json("You can only delete your post!");

			// console.log(userInfo.id);
			return res.json("Post has been deleted!");
		});
		console.log(req.method + "d", "Post with id =", postId);
	});
};
