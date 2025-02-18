"use client";

import PositionsInput from "./positionsInput";
import Button from "../../components/Button";
import { Separator } from "@/app/lib/utils";
import { createNewProject } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "../../icons/LoadingIcon";

export default function NewProjectForm() {
	const [formState, formAction] = useFormState(createNewProject, null);
	const [submitting, setSubmitting] = useState(false);
	const [formResult, setFormResult] = useState(null);
	const router = useRouter();

	const handleSubmit = async (formState) => {
		setSubmitting(true);
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
		<div className="flex flex-col items-center">
			<div className="w-full md:w-5/12 px-2">
				<h1 className="text-2xl mt-4">
					<b>Create a new project</b>
				</h1>
				<p className="text-gray-600">
					All your members will be able to see and apply to this project. Make
					sure the project name and description are descriptive!
				</p>
				<Separator />
				<p className="mb-4">
					<i>Required fields are marked with an asterix (*)</i>
				</p>
				<form action={handleSubmit} className="inline-flex flex-col w-full">
					<label htmlFor="pname">
						<b>Project name*</b>
					</label>
					<input
						className="border h-9 rounded border-gray-300 mb-4"
						required
						type="text"
						name="pname"
					/>
					<label htmlFor="description">
						<b>Description*</b>
					</label>
					<textarea
						className="border rounded border-gray-300 mb-4"
						required
						name="description"
					/>
					<Separator />
					<PositionsInput />
					<Separator />
					<div className="flex flex-row-reverse">
						<Button
							disabled={submitting}
							className={`${submitting ? "bg-gray-300 text-white hover:bg-gray-300" : ""} w-full md:w-64 mt-4 h-10 flex justify-center items-center`}
							type="submit"
						>
							{!submitting ? (
								"Create new project"
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
