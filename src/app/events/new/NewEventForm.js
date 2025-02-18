"use client";

import { Separator } from "@/app/lib/utils";
import Button from "../../components/Button";
import { createNewEvent } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "../../icons/LoadingIcon";

export default function NewEventForm() {
	const [formState, formAction] = useFormState(createNewEvent, null);
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
			router.push("/events");
		} else if (formState?.error) {
			alert(formState.error);
		}
		setSubmitting(false);
	}, [formState]);

	return (
		<div className="flex flex-col items-center">
			<div className="w-full md:w-5/12 px-2">
				<h1 className="text-2xl mt-4">
					<b>Create a new event</b>
				</h1>
				<p className="text-gray-600">
					All your members will be able to see this event. To attend an event
					they must know the code to get in!
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
					<label htmlFor="pname">
						<b>Event name*</b>
					</label>
					<input
						className="border h-9 px-2 rounded border-gray-300 mb-4"
						required
						type="text"
						name="ename"
					/>
					<label htmlFor="description">
						<b>Description*</b>
					</label>
					<textarea
						className="border rounded px-2 border-gray-300 mb-4"
						required
						name="description"
					/>
					<label htmlFor="location">
						<b>Event location*</b>
					</label>
					<input
						required
						className="border h-9 px-2 rounded border-gray-300 mb-4"
						name="location"
						type="text"
					/>
					<label htmlFor="start-date">
						<b>Starting date and time*</b>
					</label>
					<input
						required
						className="border h-9 px-2 rounded border-gray-300 mb-4"
						name="start-date"
						type="datetime-local"
						defaultValue={getTodaysDateString()}
						min={getTodaysDateString()}
					/>
					<label htmlFor="end-date">
						<b>Ending date and time*</b>
					</label>
					<input
						required
						className="border h-9 px-2 rounded border-gray-300 mb-4"
						name="end-date"
						type="datetime-local"
						defaultValue={getTodaysDateString()}
						min={getTodaysDateString()}
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

function getTodaysDateString() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dateStr = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}T00:00`;
	console.log(dateStr);
	return dateStr;
}
