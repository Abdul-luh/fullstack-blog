import express from "express";
import { getUserProfile, uploadProfile } from "../controllers/user.js";

const router = express.Router();

router.put("/:id", uploadProfile);
router.get("/:id", getUserProfile);

export default router;
