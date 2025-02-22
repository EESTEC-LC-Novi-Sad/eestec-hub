"use client";

import { useState } from "react";
import Button from "../../components/Button";

export default function ShowCodeButton({ secretCode }) {
	const [isShown, setIsShown] = useState(false);

	const showCode = () => {
		setIsShown(true);
	};

	const closeCode = () => {
		setIsShown(false);
	};
	return (
		<div>
			{isShown && (
				<div
					onClick={closeCode}
					onKeyUp={closeCode}
					className="absolute left-0 top-0 z-50 w-screen h-screen bg-gray-900/50 flex justify-center"
				>
					<div className="bg-white flex flex-col items-center py-4 h-fit mt-32 rounded w-full md:w-96">
						<p className="text-2xl">The secret event code is </p>
						<b className="text-5xl">{secretCode}</b>
						<Button onClick={closeCode} className="mt-4">
							Close
						</Button>
					</div>
				</div>
			)}
			<Button onClick={showCode}>Show event code</Button>
		</div>
	);
}
