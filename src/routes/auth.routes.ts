// Controllers
import {
	loginHandler,
	refreshTokenHandler,
	registerHandler,
} from "@controllers/auth.controller";
// Middlewares
import { validate } from "@middlewares/validate.middleware";
// Validations
import {
	loginSchema,
	refreshSessionSchema,
	registerSchema,
} from "@validations/auth.validation";
import { Router } from "express";

const router = Router();

router.post("/register", validate(registerSchema), registerHandler);
router.post("/login", validate(loginSchema), loginHandler);
router.post("/refresh", validate(refreshSessionSchema), refreshTokenHandler);

export default router;
