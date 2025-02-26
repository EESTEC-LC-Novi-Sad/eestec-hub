"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "../components/Button";
import { Separator } from "../lib/utils";
import { signUpAction } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "../icons/LoadingIcon";

export default function SignupRequestForm() {
	const [formState, formAction] = useFormState(signUpAction, null);
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
		<div className="flex flex-col items-center">
			<div className="w-full md:w-5/12 px-2">
				<h1 className="text-3xl mt-4">
					<b>Signup to EESTEC Hub!</b>
				</h1>
				<p className="text-gray-600">
					Please remember your password, if you forget it, you can say bye bye
					to your points!
				</p>
				<Separator />
				<form ref={formRef} className="flex flex-col" action={formAction}>
					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input
						required
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="email"
						name="email"
					/>
					<label htmlFor="username">
						<b>Username</b>
					</label>
					<input
						required
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="text"
						name="username"
					/>
					<label htmlFor="fname">
						<b>First name</b>
					</label>
					<input
						required
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="text"
						name="fname"
					/>
					<label htmlFor="lname">
						<b>Last name</b>
					</label>
					<input
						required
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="text"
						name="lname"
					/>
					<label htmlFor="lname">
						<b>Date of birth</b>
					</label>
					<input
						required
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="date"
						name="birth"
					/>
					<label htmlFor="password">
						<b>Password</b>
					</label>
					<input
						required
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="password"
						name="password"
					/>
					<label htmlFor="rpassword">
						<b>Repeat password</b>
					</label>
					<input
						required
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="password"
						name="rpassword"
					/>
					<Button
						onClick={handleButtonClick}
						disabled={submitting}
						className={`${submitting ? "bg-gray-300 text-white hover:bg-gray-300" : ""} w-full mt-4 h-10 flex justify-center items-center`}
						type="submit"
					>
						{!submitting ? (
							"Signup"
						) : (
							<LoadingIcon width="24" height="24" className="animate-spin" />
						)}
					</Button>
				</form>
				<span>
					Already have an account?
					<Link className="ml-1 text-blue-700 hover:underline" href="/login">
						Login
					</Link>
				</span>
			</div>
		</div>
	);
}
