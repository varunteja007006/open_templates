"use client";

import React from "react";

import { Button } from "@workspace/ui/components/button";

import { Input } from "@workspace/ui/components/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@workspace/ui/components/input-otp";

import { sendOtp, verifyOtp } from "@/lib/auth-client";
import { toast } from "sonner";

export function OtpForm() {
	const [code, setCode] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState("");
	return (
		<div className="space-y-4 my-4">
			<Input
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value ?? "")}
				placeholder="Phone number"
			/>
			<Input
				value={code}
				onChange={(e) => setCode(e.target.value ?? "")}
				placeholder="Verification Code"
			/>
			<div className="flex items-center gap-5">
				<Button
					type="button"
					onClick={() => {
						sendOtp({
							phoneNumber,
						})
							.then((res) => {
								const { data, error } = res;
								if (error) {
									toast.error(error.message);
									return;
								}
								toast.success(data.message);
							})
							.catch((err) => {
								console.error(err);
							});
					}}
				>
					TRIGGER
				</Button>
				<Button
					type="button"
					onClick={() => {
						verifyOtp({
							phoneNumber,
							code,
							updatePhoneNumber: true,
						})
							.then((res) => {
								const { data, error } = res;
								if (error) {
									toast.error(error.message);
									return;
								}
								toast.success(data.status);
								console.log(data.token, data.user);
							})
							.catch((err) => {
								console.error(err);
								toast.error(err);
							});
					}}
				>
					VERIFY
				</Button>
			</div>
		</div>
	);
}
