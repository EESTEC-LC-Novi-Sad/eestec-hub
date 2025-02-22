"use client";

import Button from "../components/Button";
import { Separator } from "../lib/utils";
import Captcha from "../components/Captcha";
import LoadingIcon from "../icons/LoadingIcon";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { sendResetPasswordEmail } from "../lib/actions";

export default function ResetPasswordPage() {
	const [submitting, setSubmitting] = useState(false);
	const [emailInput, setEmailInput] = useState("");
	const [captchaValid, setCaptchaValid] = useState(false);
	const [formState, formAction] = useFormState(sendResetPasswordEmail, null);
	const formRef = useRef(null);
	const router = useRouter();

	const handleButtonClick = () => {
		setSubmitting(true);
		formRef.current.requestSubmit();
	};

	useEffect(() => {
		if (formState?.success) {
			alert(formState.success);
			router.push("/login");
		} else if (formState?.error) {
			alert(formState.error);
		}
		setSubmitting(false);
	}, [formState]);

	return (
		<div className="flex justify-center">
			<div className="w-full md:w-5/12 px-2">
				<h1 className="text-2xl mt-4">Reset your password</h1>
				<p className="text-gray-600">
					Enter your email address and we&apos;ll send you a link to reset your
					password.
				</p>
				<Separator />
				<form ref={formRef} action={formAction} className="flex flex-col">
					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input
						className="border h-9 px-2 rounded border-gray-300 mb-4"
						required
						value={emailInput}
						onChange={(e) => setEmailInput(e.target.value)}
						type="email"
						name="email"
					/>
					<Captcha setValidity={setCaptchaValid} />
					<Button
						onClick={handleButtonClick}
						className={`${!captchaValid ? "bg-gray-300 hover:bg-gray-300 text-white" : ""} h-9 flex justify-center`}
						disabled={submitting || !captchaValid || !emailInput}
					>
						{!submitting ? (
							"Send reset link"
						) : (
							<LoadingIcon width="24" height="24" className="animate-spin" />
						)}
					</Button>
				</form>
			</div>
		</div>
	);
}
