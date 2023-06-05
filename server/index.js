import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";
const PORT = process.env.port || 8800;
const App = express();

App.use(express.json());
App.use(cookieParser());

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../client/public/upload");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	},
});
const upload = multer({ storage });

App.post("/api/publish", upload.single("file"), (req, res) => {
	const file = req.file;
	res.status(200).json(file.filename);

	console.log(file.filename);
	// console.log(req.method);
});

// 	PROFILE
const profileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../client/public/profile");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	},
});
const profileUpload = multer({ storage: profileStorage });
App.post("/api/profileUpload", profileUpload.single("profile"), (req, res) => {
	const file = req.file;
	res.status(200).json(file.filename);

	console.log(file.filename, "profileUpload");
	// console.log(req.method);
});

App.use("/api/auth", authRoutes);
App.use("/api/users", usersRoutes);
App.use("/api/posts", postRoutes);

App.listen(PORT, () => console.log(`listening on port ${PORT}`));
