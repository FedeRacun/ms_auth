// Controllers
import { loginHandler, registerHandler } from "@controllers/auth.controller";
// Middlewares
import { validate } from "@middlewares/validate.middleware";
// Validations
import { loginSchema, registerSchema } from "@validations/auth.validation";
import { Router } from "express";

const router = Router();

router.post("/register", validate(registerSchema), registerHandler);
router.post("/login", validate(loginSchema), loginHandler);

export default router;
