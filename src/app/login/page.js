import Link from "next/link";
import Button from "../components/Button";
import LoadingButton from "../components/LoadingButton";
import { Separator } from "../lib/utils";
import { signIn } from "../../../auth";

export default async function LoginPage() {
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
				<form
					className="flex flex-col"
					action={async (formData) => {
						"use server";
						await signIn("credentials", {
							email: formData.get("email"),
							password: formData.get("password"),
							redirectTo: "/",
						});
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
					<label htmlFor="password">
						<b>Password</b>
					</label>
					<input
						required
						className="px-2 border h-9 rounded border-gray-300 mb-4"
						type="password"
						name="password"
					/>
					<Button type="submit">Login</Button>
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
