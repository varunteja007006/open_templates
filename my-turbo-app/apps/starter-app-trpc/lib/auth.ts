import { betterAuth, Auth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, dbSchema } from "@/lib/db"; // your drizzle instance
import { deleteItem, getItem, setItem } from "./redis";
import { emailResetPassword, emailVerification } from "./email/api";
import { phoneNumber } from "better-auth/plugins";
import { createMessage } from "./twilio";

export const auth: Auth = betterAuth({
	// database config
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: dbSchema,
	}),
	plugins: [
		phoneNumber({
			sendOTP: ({ phoneNumber, code }, ctx) => {
				// Implement sending OTP code via SMS
				createMessage({
					toPhoneNumber: phoneNumber,
					message: `Your OTP is ${code}`,
				});
			},
			signUpOnVerification: {
				getTempEmail: (phoneNumber) => {
					return `${phoneNumber}@my-site.com`;
				},
				//optionally, you can also pass `getTempName` function to generate a temporary name for the user
				getTempName: (phoneNumber) => {
					return phoneNumber; //by default, it will use the phone number as the name
				},
			},
		}),
	],
	// session config
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 24 * 60 * 60, // Cache duration in seconds
		},
	},
	// secondary storage
	secondaryStorage: {
		get: getItem,
		set: setItem,
		delete: deleteItem,
	},
	// email auth
	emailAndPassword: {
		enabled: process.env.ALLOW_EMAIL_LOGIN === "true",
		requireEmailVerification: process.env.SEND_EMAIL_VERIFICATION == "true",
		sendResetPassword: async ({ user, url, token }, request) => {
			await emailResetPassword({
				to: [user.email],
				subject: "Reset your password",
				url: `${url}`,
			});
		},
		onPasswordReset: async ({ user }, request) => {
			console.log(`Password for user ${user.email} has been reset.`);
		},
	},

	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await emailVerification({
				to: [user.email],
				subject: "Verify your email address",
				url: `${url}`,
			});
		},
	},
	//...Providers
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			accessType: "offline",
			prompt: "select_account consent",
		},
	},
});
