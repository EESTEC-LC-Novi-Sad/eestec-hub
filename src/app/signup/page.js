import { createUser } from "@/services/user.service";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "../components/Button";
import { Separator } from "../lib/utils";

export default async function SignUp() {
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
				<form
					className="flex flex-col"
					action={async (formData) => {
						"use server";
						const password = formData.get("password");
						const rpassword = formData.get("rpassword");
						if (password !== rpassword) {
							throw new Error("Passwords do not match!");
						}

						const userData = {
							email: formData.get("email"),
							username: formData.get("username"),
							firstName: formData.get("fname"),
							lastName: formData.get("lname"),
							birthDate: new Date(formData.get("birth")),
							password: password,
							rpassword: rpassword,
						};

						const newUser = await createUser(userData);
						if (newUser) {
							redirect("/login");
						} else {
							throw new Error(
								"ERROR: Couldn't sign you up! Check if the feilds are correct",
							);
						}
					}}
				>
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
					<Button type="submit">Signup</Button>
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
