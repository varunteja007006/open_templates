// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio"; // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function createMessage({
	toPhoneNumber,
	message,
}: {
	toPhoneNumber: string;
	message: string;
}) {
	client.messages
		.create({
			body: message,
			from: process.env.TWILIO_FROM_PHONE_NUMBER,
			to: toPhoneNumber,
		})
		.then((res) => {
			console.log("\n-----------Trigger-------------", res);
		})
		.catch((err) => {
			console.error("\nFAILED TO SEND OTP" + " " + createMessage.name, err);
		});
}
