// Controllers
import {
	confirmEmailHandler,
	forgotPasswordHandler,
	loginHandler,
	logoutHandler,
	refreshTokenHandler,
	registerHandler,
	resetPasswordHandler,
} from "@controllers/auth.controller";
// Middlewares
import { validate } from "@middlewares/validate.middleware";
// Validations
import {
	confirmEmailSchema,
	forgotPasswordSchema,
	loginSchema,
	refreshSessionSchema,
	registerSchema,
	resetPasswordSchema,
} from "@validations/auth.validation";
import { Router } from "express";

const router = Router();

router.post("/register", validate(registerSchema), registerHandler);
router.post("/login", validate(loginSchema), loginHandler);
router.post("/logout", logoutHandler);

router.post("/refresh", validate(refreshSessionSchema), refreshTokenHandler);

router.post(
	"/confirm-email",
	validate(confirmEmailSchema),
	confirmEmailHandler,
);

router.post(
	"/forgot-password",
	validate(forgotPasswordSchema),
	forgotPasswordHandler,
);
router.post(
	"/reset-password",
	validate(resetPasswordSchema),
	resetPasswordHandler,
);

export default router;
