"use client";

import EditButton from "./editButton";
import Image from "next/image";
import backupProfileImage from "../../../images/profile.jpeg";
import { useState, useEffect } from "react";

export default function ImageEdit({ className, userPhoto, onFileUpload }) {
	const [imageFileUrl, setImageFileUrl] = useState(null);
	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imageFileUrl);
		};
	}, [imageFileUrl]);

	const uploadHandler = (file) => {
		if (imageFileUrl) {
			URL.revokeObjectURL(imageFileUrl);
		}
		const url = URL.createObjectURL(file);
		setImageFileUrl(url);
		onFileUpload(file);
	};

	const removeHandler = () => {
		setImageFileUrl("removed");
		onFileUpload("removed");
	};

	return (
		<div>
			<Image
				src={
					(imageFileUrl === "removed" ? backupProfileImage : imageFileUrl) ||
					(userPhoto === "removed" ? null : userPhoto) ||
					backupProfileImage
				}
				alt="Profile picture"
				width={200}
				height={200}
				className={`border border-gray-400 rounded-full w-44 h-44 object-cover ${className}`}
			/>
			<EditButton
				uploadHandler={uploadHandler}
				removeHandler={removeHandler}
				className="relative -top-12 left-2"
			/>
		</div>
	);
}
