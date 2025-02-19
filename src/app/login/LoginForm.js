"use client";

import { Separator } from "@/app/lib/utils";
import { signIn } from "next-auth/react";
import Button from "../components/Button";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "../icons/LoadingIcon";
import Link from "next/link";

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const canLogin = emailInput && passwordInput;

	const formRef = useRef(null);
	const router = useRouter();

	const handleButtonClick = () => {
		setSubmitting(true);
		formRef.current.requestSubmit();
	};

	const handleSubmit = async (formData) => {
		try {
			const res = await signIn("credentials", {
				email: formData.get("email"),
				password: formData.get("password"),
				redirect: false,
			});
			if (res.error) {
				alert("Failed to login, email or password is incorrect!");
			} else {
				alert("Successfully logged in!");
				router.push("/");
			}
		} catch (err) {
			console.error(err);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<div className="flex flex-col items-center">
			<div className="w-full md:w-5/12 px-2">
				<h1 className="text-3xl mt-4">
					<b>Welcome to EESTEC Hub!</b>
				</h1>
				<p className="text-gray-600">
					The all things EESTEC app! You can find all your awailable projects,
					teams and events here.
				</p>
				<Separator />
				<form ref={formRef} className="flex flex-col" action={handleSubmit}>
					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input
						required
						value={emailInput}
						onChange={(e) => setEmailInput(e.target.value)}
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="email"
						name="email"
					/>
					<label htmlFor="password">
						<b>Password</b>
					</label>
					<input
						required
						value={passwordInput}
						onChange={(e) => setPasswordInput(e.target.value)}
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="password"
						name="password"
					/>
					<Button
						onClick={handleButtonClick}
						disabled={submitting || !canLogin}
						className={`${submitting ? "bg-gray-300 text-white hover:bg-gray-300" : ""} ${!canLogin ? "bg-gray-200 hover:bg-gray-200 text-gray-500" : ""} w-full mt-4 h-10 flex justify-center items-center`}
						type="submit"
					>
						{!submitting ? (
							"Login"
						) : (
							<LoadingIcon width="24" height="24" className="animate-spin" />
						)}
					</Button>
				</form>
				<span>
					Dont have an account yet?
					<Link className="ml-1 text-blue-700 hover:underline" href="/signup">
						Signup here
					</Link>
				</span>
			</div>
		</div>
	);
}
