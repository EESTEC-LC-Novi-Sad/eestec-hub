"use client";

import Button from "../../components/Button";
import { joinTeamAction } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "../../icons/LoadingIcon";

export default function TeamJoinButton({ teamId, memberId }) {
	const [formState, formAction] = useFormState(joinTeamAction, null);
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
		<form
			className="w-full flex flex-row-reverse"
			action={formAction}
			ref={formRef}
		>
			<input type="hidden" name="teamId" value={teamId} />
			<input type="hidden" name="memberId" value={memberId} />
			<Button
				onClick={handleButtonClick}
				disabled={submitting}
				className={`${submitting ? "bg-gray-300 text-white hover:bg-gray-300" : ""} 
                    w-full md:w-20 mt-4 h-10 flex justify-center items-center text-green-700 border-green-700`}
				type="submit"
			>
				{!submitting ? (
					"Join"
				) : (
					<LoadingIcon width="24" height="24" className="animate-spin" />
				)}
			</Button>
		</form>
	);
}
