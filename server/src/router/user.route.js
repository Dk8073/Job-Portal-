import { Router } from "express";
import {authenticateJWT} from '../middlewares/auth.middleware.js'
import { uplaod } from "../middlewares/multer.middleware.js";
import { uploadAvatar } from "../controllers/user.controller.js";

const router = Router()

router.post("/upload-avatar", authenticateJWT, uplaod.single("avatar"), uploadAvatar)

export default router;