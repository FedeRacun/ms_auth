import { AuthService } from "@services/auth.service";
import { resError, resSuccess } from "@utils/responseHelper";
import type {
	ConfirmEmailBody,
	ForgotPasswordBody,
	LoginBody,
	RefreshSessionBody,
	RegisterBody,
	ResetPasswordBody,
} from "@validations/auth.validation";
import type { Request, Response } from "express";

const authService = new AuthService();

export const registerHandler = async (
	req: Request<Record<string, unknown>, object, RegisterBody>,
	res: Response,
): Promise<void> => {
	const { email, password } = req.body;

	try {
		const result = await authService.register(email, password);
		resSuccess(res, result, 201);
	} catch (err) {
		const error = err as Error;
		resError(res, error.message, 400);
	}
};

export const loginHandler = async (
	req: Request<Record<string, unknown>, object, LoginBody>,
	res: Response,
): Promise<void> => {
	const { email, password } = req.body;

	try {
		const result = await authService.login(email, password);
		resSuccess(res, result);
	} catch (err) {
		const error = err as Error;
		resError(res, error.message, 401);
	}
};

export const refreshTokenHandler = async (
	req: Request<Record<string, unknown>, object, RefreshSessionBody>,
	res: Response,
): Promise<void> => {
	const { refreshToken } = req.body;

	try {
		const result = await authService.refresh(refreshToken);
		resSuccess(res, result);
	} catch (err) {
		const error = err as Error;
		resError(res, error.message, 401);
	}
};

export const logoutHandler = async (
	_: Request,
	res: Response,
): Promise<void> => {
	try {
		await authService.logout();
		resSuccess(res, { message: "Logout successful" });
	} catch (err) {
		const error = err as Error;
		resError(res, error.message, 401);
	}
};

export const forgotPasswordHandler = async (
	req: Request<Record<string, unknown>, object, ForgotPasswordBody>,
	res: Response,
): Promise<void> => {
	const { email } = req.body;

	try {
		const result = await authService.forgotPassword(email);
		resSuccess(res, result);
	} catch (err) {
		const error = err as Error;
		resError(res, error.message, 400);
	}
};

export const confirmEmailHandler = async (
	req: Request<Record<string, unknown>, object, ConfirmEmailBody>,
	res: Response,
): Promise<void> => {
	const { email, accessToken } = req.body;

	try {
		const result = await authService.confirmEmail(email, accessToken);
		resSuccess(res, result);
	} catch (err) {
		const error = err as Error;
		resError(res, error.message, 400);
	}
};

export const resetPasswordHandler = async (
	req: Request<Record<string, unknown>, object, ResetPasswordBody>,
	res: Response,
): Promise<void> => {
	const { newPassword, accessToken } = req.body;

  try {
    const result = await authService.resetPassword(accessToken, newPassword);
    resSuccess(res, result);
  } catch (err) {
    const error = err as Error;
    resError(res, error.message, 400);
  }
};
