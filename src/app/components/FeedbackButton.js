"use client";

import Button from "./Button";
import { Separator } from "../lib/utils";
import { sendFeedbackAction } from "../lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "@/app/icons/LoadingIcon";
import CloseIcon from "@/app/icons/CloseIcon";

export default function FeedbackButton({ userId, className }) {
	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [formState, formAction] = useFormState(sendFeedbackAction, null);
	const [submitting, setSubmitting] = useState(false);
	const formRef = useRef(null);

	const handleButtonClick = () => {
		setSubmitting(true);
		formRef.current.requestSubmit();
	};

	useEffect(() => {
		if (formState?.success) {
			alert(formState.success);
			setFeedback("");
			setIsFeedbackOpen(false);
		} else if (formState?.error) {
			alert(formState.error);
		}
		setSubmitting(false);
	}, [formState]);

	return (
		<div>
			<div
				onClick={() => setIsFeedbackOpen(false)}
				onKeyUp={() => setIsFeedbackOpen(false)}
				className={`${!isFeedbackOpen ? "hidden" : ""}
                absolute left-0 top-0 z-50 w-screen h-full flex justify-center bg-gray-900/50`}
			>
				<form
					ref={formRef}
					action={formAction}
					className="p-2 h-fit w-full md:w-fit flex flex-col justify-center bg-white rounded mt-24"
					onClick={(e) => e.stopPropagation()}
					onKeyUp={(e) => e.stopPropagation()}
				>
					<div className="flex justify-between mb-2">
						<h1 className="text-2xl">
							<b>Send us your feedback</b>
						</h1>
						<Button
							onClick={() => setIsFeedbackOpen(false)}
							className="w-fit"
							type="button"
						>
							<CloseIcon />
						</Button>
					</div>
					<p className="text-gray-600">
						We value your feedback. Please let us know if you found any bugs or
						how we can imporve your experience.
						<br /> You can also report bugs and give suggestions in our{" "}
						<a
							className="text-blue-700 hover:underline"
							rel="noopener noreferrer"
							target="_blank"
							href="https://github.com/EESTEC-LC-Novi-Sad/eestec-hub/issues"
						>
							github repository.
						</a>
					</p>
					<Separator />
					<input type="hidden" name="userId" value={userId} />
					<textarea
						required
						value={feedback}
						onChange={(e) => setFeedback(e.target.value)}
						className="border rounded px-2 border-gray-300 mb-4"
						name="feedback"
						cols="30"
						rows="10"
					/>
					<Button
						onClick={handleButtonClick}
						disabled={submitting || !feedback}
						className={`${submitting ? "bg-gray-300 text-white hover:bg-gray-300" : ""} w-full mt-4 h-10 flex justify-center items-center`}
						type="submit"
					>
						{!submitting ? (
							"Send feedback"
						) : (
							<LoadingIcon width="24" height="24" className="animate-spin" />
						)}
					</Button>
				</form>
			</div>
			<Button className={className} onClick={() => setIsFeedbackOpen(true)}>
				Feedback
			</Button>
		</div>
	);
}
