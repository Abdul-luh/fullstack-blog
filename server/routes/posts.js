import express from "express";
import {
	addPost,
	deletePost,
	getOnePost,
	getAllPosts,
	updatePost,
	getMyPosts,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/myposts/:id", getMyPosts);
router.get("/:id", getOnePost);
router.post("/", addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
