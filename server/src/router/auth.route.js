import { Router } from 'express'
import { login, logout, signup, validateAuth } from '../controllers/auth.controller.js';
import {authenticateJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup)
router.post("/signin", login)
router.post("/logout", authenticateJWT, logout)
router.post("/validate-auth", authenticateJWT, validateAuth)

export default router;