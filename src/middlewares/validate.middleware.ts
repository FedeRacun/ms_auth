import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validate =
	(schema: ZodSchema) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			const errors: Record<string, string[]> = {};

			const formattedErrors = result.error.flatten();

			// Cargamos errores de campos
			if (formattedErrors.fieldErrors) {
				for (const key in formattedErrors.fieldErrors) {
					if (formattedErrors.fieldErrors[key]) {
						errors[key] = formattedErrors.fieldErrors[key] as string[];
					}
				}
			}

			// Si no hay fieldErrors pero hay formErrors generales
			if (formattedErrors.formErrors.length > 0) {
				errors.form = formattedErrors.formErrors;
			}

			res.status(400).json({ errors });
			return;
		}
		next();
	};
