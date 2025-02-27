"use client";

import { Separator } from "@/app/lib/utils";
import Button from "@/app/components/Button";
import { applyToProjectAction } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "@/app/icons/LoadingIcon";

export default function ApplyToProjectForm({
	coordinatorPositions,
	projectId,
}) {
	const [formState, formAction] = useFormState(applyToProjectAction, null);
	const [submitting, setSubmitting] = useState(false);
	const formRef = useRef(null);
	const router = useRouter();

	const handleButtonClick = () => {
		setSubmitting(true);
		formRef.current.requestSubmit();
	};

	const handleSubmit = async (formState) => {
		formAction(formState);
	};

	useEffect(() => {
		if (formState?.success) {
			alert(formState.success);
			router.push("/projects");
		} else if (formState?.error) {
			alert(formState.error);
		}
		setSubmitting(false);
	}, [formState]);

	return (
		<form action={formAction} ref={formRef}>
			{coordinatorPositions && coordinatorPositions.length > 0 && (
				<div>
					<label for="position">
						<b>Applying for*</b>
					</label>
					<select
						id="position"
						name="position"
						required
						className="w-full px-2"
					>
						<option value="">--Please select a position--</option>
						{coordinatorPositions.map((c, index) => {
							return (
								<option name={c.toLowerCase()} key={index}>
									{c}
								</option>
							);
						})}
					</select>
					<p className="mt-1 mb-4 text-sm text-gray-600">
						If you want to apply for more than one position, you will have to
						fill-out this application multiple times!
					</p>
				</div>
			)}
			<label for="motivation">
				<b>Motivation*</b>
			</label>
			<textarea
				className="w-full border rounded-md px-2 border-gray-300"
				required
				name="motivation"
				placeholder="Why do you want to work on this project?"
			/>
			<p className="mt-1 mb-4 text-sm text-gray-600">
				Make sure to write at least 150 words, this is the most important part
				of your application.
			</p>
			<input type="hidden" name="projectId" value={projectId} />
			<Separator />
			<div className="flex flex-row-reverse">
				<Button
					onClick={handleButtonClick}
					disabled={submitting}
					className={`${submitting ? "bg-gray-300 text-white hover:bg-gray-300" : ""} w-full md:w-3/12 mt-4 h-10 flex justify-center items-center`}
					type="submit"
				>
					{!submitting ? (
						"Apply"
					) : (
						<LoadingIcon width="24" height="24" className="animate-spin" />
					)}
				</Button>
			</div>
		</form>
	);
}
