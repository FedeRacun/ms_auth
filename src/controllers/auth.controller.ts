import { supabase } from "@services/supabase.service";
import type { LoginBody, RegisterBody } from "@validations/auth.validation";
import type { Request, Response } from "express";

export const registerHandler = async (
	req: Request<Record<string, unknown>, object, RegisterBody>,
	res: Response,
): Promise<void> => {
	const { email, password } = req.body;

	const { data, error } = await supabase.auth.signUp({ email, password });

	if (error) {
		console.error("Error signing up:", error);
		res.status(400).json({ error: error.message });
		return;
	}

	res.status(201).json({ user: data.user });
};

export const loginHandler = async (
	req: Request<Record<string, unknown>, object, LoginBody>,
	res: Response,
): Promise<void> => {
	const { email, password } = req.body;

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		res.status(401).json({ error: error.message });
		return;
	}

	res.json({
		access_token: data.session?.access_token,
		refresh_token: data.session?.refresh_token,
		user: data.user,
	});
};
