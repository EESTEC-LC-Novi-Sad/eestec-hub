"use client";

import Button from "@/app/components/Button";
import { respondToTeamApplicationAction } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "@/app/icons/LoadingIcon";

export default function RespondToTeamApplicationButton({
	applicationId,
	status,
}) {
	const [formState, formAction] = useFormState(
		respondToTeamApplicationAction,
		null,
	);
	const [submitting, setSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const formRef = useRef(null);

	const handleButtonClick = () => {
		setSubmitting(true);
		formRef.current.requestSubmit();
	};

	useEffect(() => {
		if (formState?.success) {
			alert(formState.success);
			window.location.reload();
		} else if (formState?.error) {
			alert(formState.error);
		}
		setSubmitting(false);
	}, [formState]);

	return (
		<form ref={formRef} action={formAction}>
			<input type="hidden" name="applicationId" value={applicationId} />
			<input type="hidden" name="status" value={status} />
			<Button
				onClick={handleButtonClick}
				disabled={submitting || isSuccess}
				className={`${submitting || isSuccess ? "bg-gray-300 text-white hover:bg-gray-300" : ""} h-8 w-16 flex justify-center items-center`}
				type="submit"
			>
				{!submitting ? (
					status === "joined" ? (
						"Accept"
					) : (
						"Reject"
					)
				) : (
					<LoadingIcon width="24" height="24" className="animate-spin" />
				)}
			</Button>
		</form>
	);
}
