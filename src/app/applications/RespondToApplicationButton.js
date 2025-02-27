"use client";

import Button from "@/app/components/Button";
import { respondToApplicationAction } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "@/app/icons/LoadingIcon";

export default function RespondToApplicationButton({
	applicationId,
	memberId,
	projectId,
	status,
	className,
	redirectTo,
}) {
	const [formState, formAction] = useFormState(
		respondToApplicationAction,
		null,
	);
	const [submitting, setSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const formRef = useRef(null);
	const router = useRouter();

	const handleButtonClick = () => {
		setSubmitting(true);
		formRef.current.requestSubmit();
	};

	useEffect(() => {
		if (formState?.success) {
			alert(formState.success);
			if (redirectTo) {
				router.push(redirectTo);
			} else {
				window.location.reload();
			}
		} else if (formState?.error) {
			alert(formState.error);
		}
		setSubmitting(false);
	}, [formState]);

	return (
		<form ref={formRef} action={formAction}>
			<input type="hidden" name="applicationId" value={applicationId} />
			<input type="hidden" name="status" value={status} />
			<input type="hidden" name="memberId" value={memberId} />
			<input type="hidden" name="projectId" value={projectId} />
			<Button
				onClick={handleButtonClick}
				disabled={submitting || isSuccess}
				className={`${submitting || isSuccess ? "bg-gray-300 text-white hover:bg-gray-300" : ""} h-8 w-16 flex justify-center items-center ${className}`}
				type="submit"
			>
				{!submitting ? (
					status === "accepted" ? (
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
