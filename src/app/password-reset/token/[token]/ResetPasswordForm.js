"use client";

import { Separator } from "@/app/lib/utils";
import Button from "../../../components/Button";
import { resetPassword } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "../../../icons/LoadingIcon";

export default function ResetPasswordForm({ token }) {
	const [formState, formAction] = useFormState(resetPassword, null);
	const [submitting, setSubmitting] = useState(false);
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
				<h1 className="text-2xl">Reset your password</h1>
				<form ref={formRef} className="flex flex-col" action={formAction}>
					<label htmlFor="password">
						<b>Your new password</b>
					</label>
					<input
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="password"
						name="password"
						required
					/>
					<label htmlFor="rpassword">
						<b>Confirm your new password</b>
					</label>
					<input
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="password"
						name="rpassword"
						required
					/>
					<input type="hidden" name="token" value={token} />
					<div className="flex justify-center">
						<Button
							onClick={handleButtonClick}
							disabled={submitting}
							className={`${submitting ? "bg-gray-300 text-white hover:bg-gray-300" : ""} w-full md:w-64 mt-4 h-10 flex justify-center items-center`}
							type="submit"
						>
							{!submitting ? (
								"Reset password"
							) : (
								<LoadingIcon width="24" height="24" className="animate-spin" />
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
