"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingIcon from "../icons/LoadingIcon";
import CheckAllIcon from "../icons/CheckAllIcon";

const captchas = [
	"3M56R",
	"459CT",
	"D4TSH",
	"HAPK3",
	"HJ9PV",
	"JA3V8",
	"R84CH",
	"RBSKW",
	"TSMS9",
	"W93BX",
];

export default function Captcha({ setValidity }) {
	const [captcha, setCaptcha] = useState(null);
	const [captchaInput, setCaptchaInput] = useState("");
	const [captchaValid, setCaptchaValid] = useState(false);
	const [isChecking, setIsChecking] = useState(false);

	let checkTimeout;

	useEffect(() => {
		setCaptcha(captchas[Math.floor(Math.random() * captchas.length)]);
	}, []);

	useEffect(() => {
		setIsChecking(true);
		setCaptchaValid(false);
		setValidity(false);

		checkTimeout = setTimeout(() => {
			setIsChecking(false);
			if (captchaInput === captcha) {
				setCaptchaValid(true);
				setValidity(true);
			}
		}, 2000);
	}, [captchaInput]);

	return (
		<div className="mb-2 w-fit">
			<p>
				<b>Please solve this captcha</b>
			</p>
			<div className="border rounded p-2">
				{captcha && (
					<Image
						className="rounded"
						src={`/captcha/${captcha}.jpg`}
						alt="captcha"
						width={240}
						height={100}
					/>
				)}
				<input
					value={captchaInput}
					onChange={(e) => setCaptchaInput(e.target.value)}
					className={`${captchaValid ? "border-green-600 border-2" : "border-red-600 border-2"} w-full mt-2 border h-9 px-2 rounded border-gray-300 mb-2`}
					type="text"
					placeholder="Enter captcha"
				/>
				<div className="flex items-center gap-1">
					Status:
					{isChecking && (
						<LoadingIcon className="animate-spin" width="18" height="18" />
					)}
					{!isChecking && !captchaValid && <b className="text-red-700">X</b>}
					{!isChecking && captchaValid && (
						<CheckAllIcon className="text-green-700" />
					)}
				</div>
			</div>
		</div>
	);
}
