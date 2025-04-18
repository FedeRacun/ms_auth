import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validate =
	(schema: ZodSchema) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			const errors = result.error.flatten();
			res.status(400).json({ errors: errors.fieldErrors });
			return;
		}
		next();
	};
