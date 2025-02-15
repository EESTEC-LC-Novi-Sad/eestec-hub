"use client";

import ImageEdit from "./imageEdit";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { updateProfile } from "../../lib/actions";
import Button from "@/app/components/Button";
import LinkButton from "@/app/components/LinkButton";
import { Separator } from "@/app/lib/utils";

export default function ProfileForm({ userStr }) {
	const [user, setUser] = useState(JSON.parse(userStr));
	const [imageFile, setImageFile] = useState(null);
	const [formState, formAction] = useFormState(updateProfile, null);

	const onFileUpload = (file) => {
		setImageFile(file);
	};

	const handleSubmit = async (formState) => {
		if (imageFile) {
			formState.append("imageFile", imageFile);
		}
		formAction(formState);
	};

	useEffect(() => {
		if (formState?.success) {
			alert(formState.success);
			window.location.reload();
		} else if (formState?.error) {
			alert(formState.error);
		}
	}, [formState]);

	const formatDateForInput = (dateString) => {
		if (!dateString) return;
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
	};

	return (
		<div className="flex flex-col md:flex-row-reverse">
			<div className="md:ml-8">
				<label>
					<b>Profile picture</b>
				</label>
				<ImageEdit onFileUpload={onFileUpload} userPhoto={user?.imageUri} />
			</div>
			<form action={handleSubmit} className="max-w-96">
				<label htmlFor="fname">
					<b>First name</b>
				</label>
				<input
					type="text"
					defaultValue={user?.firstName ?? ""}
					name="fname"
					className="px-2 border border-gray-300 rounded w-full"
				/>
				<label htmlFor="lname">
					<b>Last name</b>
				</label>
				<input
					type="text"
					defaultValue={user?.lastName ?? ""}
					name="lname"
					className="px-2 border border-gray-300 rounded w-full"
				/>
				<p className="mt-1 mb-4 text-sm text-gray-600">
					Your name will may appear when you apply to a project or attend an
					event. This will make it easier for board members to recognise you!
				</p>
				<label htmlFor="bio">
					<b>Bio</b>
				</label>
				<textarea
					type="text"
					defaultValue={user?.bio ?? ""}
					name="bio"
					className="px-2 border border-gray-300 rounded w-full"
				/>
				<p className="mt-1 mb-4 text-sm text-gray-600">
					Tell us a bit about yourself. This will appear on your public profile.
				</p>
				<Separator />
				<label htmlFor="location">
					<b>Location</b>
				</label>
				<input
					type="text"
					defaultValue={user?.location ?? ""}
					name="location"
					placeholder="eg. Novi Sad"
					className="px-2 border border-gray-300 rounded w-full"
				/>
				<p className="mt-1 mb-4 text-sm text-gray-600">
					Your location will be visible on your public profile.
				</p>
				<label htmlFor="birthday">
					<b>Birthday</b>
				</label>
				<input
					type="date"
					defaultValue={formatDateForInput(user?.birthDate) ?? ""}
					name="birthday"
					className="px-2 border border-gray-300 rounded w-full"
				/>
				<p className="mt-1 mb-4 text-sm text-gray-600">
					Let the people know what generation you belong to! Your birthday will
					be visible on your public profile.
				</p>
				<label htmlFor="social">
					<b>Social account</b>
				</label>
				<input
					type="text"
					defaultValue={user?.socialUrl ?? ""}
					name="social"
					placeholder="https://www.instagram.com/username"
					className="px-2 border border-gray-300 rounded w-full"
				/>
				<p className="mt-1 mb-4 text-sm text-gray-600">
					Help other members find your socials, this is visible on your public
					profile page.
				</p>
				<div className="flex mt-4 gap-2">
					<Button type="submit" className="border-green-700 text-green-700">
						Save changes
					</Button>
					<LinkButton
						href={`/profile/${encodeURI(user.username)}`}
						className=" border-red-700 text-red-700"
					>
						Cancel
					</LinkButton>
				</div>
			</form>
		</div>
	);
}
