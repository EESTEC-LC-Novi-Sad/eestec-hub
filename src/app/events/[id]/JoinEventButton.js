"use client";

import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/app/lib/utils";
import { joinEventFormAction } from "@/app/lib/actions";
import TeamsIcon from "@/app/icons/TeamsIcon";
import LoadingIcon from "@/app/icons/LoadingIcon";
import Button from "../../components/Button";

export default function JoinEventButton({ event, session }) {
	const [isShown, setIsShown] = useState(false);
	const [formState, formAction] = useFormState(joinEventFormAction, null);
	const [submitting, setSubmitting] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const formRef = useRef(null);
	const router = useRouter();
	const canPressJoin = inputValue.length > 0;

	const showCode = () => {
		setIsShown(true);
	};

	const closeCode = () => {
		setIsShown(false);
	};

	const handleButtonClick = () => {
		setSubmitting(true);
		formRef.current.requestSubmit();
	};

	useEffect(() => {
		if (formState?.success) {
			alert(formState.success);
			router.push(`/events/${event._id}`);
		} else if (formState?.error) {
			alert(formState.error);
		}
		setSubmitting(false);
	}, [formState]);

	return (
		<div>
			{isShown && (
				<div
					onClick={closeCode}
					onKeyUp={closeCode}
					className="absolute left-0 top-0 z-50 w-screen h-screen bg-gray-900/50 flex justify-center"
				>
					<div
						onClick={(e) => e.stopPropagation()}
						onKeyUp={(e) => e.stopPropagation()}
						className="py-4 h-fit mt-32 rounded px-2 bg-white w-full md:w-96"
					>
						<h1 className="text-3xl my-2">
							<b>Join event</b>
						</h1>
						<p className="text-gray-600">
							Please enter the secret code for this event. Your board should
							have provided you with the code, if not, you can always ask your
							neighbour for help!
						</p>
						<Separator />
						<span className="flex gap-1 mb-2 text-sm text-gray-600">
							<TeamsIcon width="18" height="18" />
							{event.attendees.length}
							{event.attendees.length === 1 ? " attendee" : " attendees"}
						</span>
						<form ref={formRef} action={formAction}>
							<input
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className="w-full px-2 border h-9 rounded border-gray-300 mb-4"
								type="number"
								name="code"
							/>
							<input type="hidden" name="eventId" value={event._id} />
							<input type="hidden" name="userId" value={session.user.id} />
							<input type="hidden" name="eventCode" value={event.code} />
							<div className="flex justify-center">
								<Button
									onClick={handleButtonClick}
									disabled={submitting || !canPressJoin}
									className={`${submitting || !canPressJoin ? "bg-gray-300 text-white hover:bg-gray-300" : ""} w-full md:w-56 mt-4 h-8 flex justify-center items-center border-green-700 text-green-700`}
									type="submit"
								>
									{!submitting ? (
										"Join"
									) : (
										<LoadingIcon
											width="22"
											height="22"
											className="animate-spin"
										/>
									)}
								</Button>
								<Button onClick={closeCode} className="mt-4 ml-2 h-8">
									Cancel
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
			<Button className="text-green-700 border-green-700" onClick={showCode}>
				Join the event
			</Button>
		</div>
	);
}
