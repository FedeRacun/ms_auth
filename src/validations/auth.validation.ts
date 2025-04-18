import { z } from "zod";

export const registerSchema = z
	.object({
		email: z.string().email({ message: "Email inválido" }),
		password: z
			.string()
			.min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
	})
	.strict();

export const loginSchema = z
	.object({
		email: z.string().email({ message: "Email inválido" }),
		password: z.string().min(6, { message: "Contraseña inválida" }),
	})
	.strict();

// Tipos inferidos automáticamente
export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
