"use client";

import { Separator } from "@/app/lib/utils";
import Button from "../../components/Button";
import { createNewTeamAction } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "../../icons/LoadingIcon";

export default function NewTeamForm() {
	const [formState, formAction] = useFormState(createNewTeamAction, null);
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
			router.push("/teams");
		} else if (formState?.error) {
			alert(formState.error);
		}
		setSubmitting(false);
	}, [formState]);
	return (
		<div className="flex flex-col items-center">
			<div className="w-full md:w-5/12 px-2">
				<h1 className="text-2xl mt-4">
					<b>Create a new team</b>
				</h1>
				<p className="text-gray-600">
					All your members will be able to see and apply to this team. You will
					be able to see their applications in the applications page!
				</p>
				<Separator />
				<p className="mb-4">
					<i>Required fields are marked with an asterix (*)</i>
				</p>
				<form
					ref={formRef}
					className="inline-flex flex-col w-full"
					action={handleSubmit}
				>
					<label htmlFor="tname">
						<b>Team name*</b>
					</label>
					<input
						className="border h-9 rounded border-gray-300 mb-4"
						required
						type="text"
						name="tname"
					/>
					<label htmlFor="description">
						<b>Description*</b>
					</label>
					<textarea
						className="border rounded border-gray-300 mb-4"
						required
						name="description"
					/>
					<div className="flex flex-row-reverse">
						<Button
							onClick={handleButtonClick}
							disabled={submitting}
							className={`${submitting ? "bg-gray-300 text-white hover:bg-gray-300" : ""} w-full md:w-64 mt-4 h-10 flex justify-center items-center`}
							type="submit"
						>
							{!submitting ? (
								"Create a new team"
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
