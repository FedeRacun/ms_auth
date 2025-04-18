import type { Response } from "express";

export function resSuccess<T = unknown>(
	res: Response,
	data: T,
	statusCode = 200,
): Response {
	return res.status(statusCode).json({
		success: true,
		data,
	});
}

export function resError(
	res: Response,
	message: string,
	statusCode = 400,
): Response {
	return res.status(statusCode).json({
		success: false,
		error: message,
	});
}
