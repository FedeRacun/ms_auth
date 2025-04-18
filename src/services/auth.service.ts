import { supabase } from "@services/supabase.service";

export class AuthService {
	async register(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({ email, password });

		if (error) {
			throw new Error(error.message);
		}

		if (!data.user) {
			throw new Error("User creation failed");
		}

		return { user: data.user };
	}

	async login(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw new Error(error.message);
		}

		if (!data.session) {
			throw new Error("Invalid session data");
		}

		return {
			access_token: data.session.access_token,
			refresh_token: data.session.refresh_token,
			user: data.user,
		};
	}

	async refresh(refreshToken: string) {
		const { data, error } = await supabase.auth.refreshSession({
			refresh_token: refreshToken,
		});

		if (error) {
			throw new Error(error.message);
		}

		if (!data.session) {
			throw new Error("Invalid session data");
		}

		return {
			access_token: data.session.access_token,
			refresh_token: data.session.refresh_token,
		};
	}

	async logout() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw new Error(error.message);
		}
	}

	async forgotPassword(email: string) {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `http://localhost:${process.env.PORT || 3000}/auth/reset-password`,
		});

		if (error) {
			throw new Error(error.message);
		}
	}

	async confirmEmail(email: string, token: string) {
		const { error } = await supabase.auth.verifyOtp({
			email,
			token,
			type: "signup",
		});

		if (error) {
			throw new Error(error.message);
		}
	}

	async resetPassword(accessToken: string, newPassword: string) {
		const { error: setSessionError } = await supabase.auth.setSession({
			access_token: accessToken,
			refresh_token: '',
		});
	
		if (setSessionError) {
			throw new Error(setSessionError.message);
		}
	
		const { error: updateError } = await supabase.auth.updateUser({
			password: newPassword,
		});
	
		if (updateError) {
			throw new Error(updateError.message);
		}
	
		return { message: "Password updated successfully" };
	}
	
}
