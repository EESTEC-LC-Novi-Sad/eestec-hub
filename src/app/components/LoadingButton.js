"use client";

import Button from "./Button";
import { useState, useRef } from "react";

export default function LoadingButton({ className, onClick, type, children }) {
	const [disabled, setDisabled] = useState(false);
	const buttonRef = useRef(null);
	const buttonClicked = () => {
		console.log("yoyoyoy");
		if (onClick) {
			onClick();
		}
		console.log(buttonRef.current);
		setDisabled(true);
	};

	return (
		<Button
			className={`${disabled ? "bg-gray-300 text-white" : ""} ${className}`}
			onClick={buttonClicked}
			type={type}
			disabled={disabled}
			ref={buttonRef}
		>
			{children}
		</Button>
	);
}
