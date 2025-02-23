export default function TeamsIcon({ className, width, height }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width ?? "23"}
			height={height ?? "23"}
			viewBox="0 0 32 32"
		>
			<path
				fill="currentColor"
				d="M16 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm-6-3.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Zm19 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0ZM9.377 13a3.983 3.983 0 0 0-.877 2.5V23c0 1.235.298 2.4.827 3.427A5 5 0 0 1 2 22v-6.5A2.5 2.5 0 0 1 4.5 13h4.877Zm13.296 13.427A7.468 7.468 0 0 0 23.5 23v-7.5c0-.946-.328-1.815-.877-2.5H27.5a2.5 2.5 0 0 1 2.5 2.5V22a5 5 0 0 1-7.327 4.427ZM12.5 13a2.5 2.5 0 0 0-2.5 2.5V23a6 6 0 0 0 12 0v-7.5a2.5 2.5 0 0 0-2.5-2.5h-7Z"
			/>
		</svg>
	);
}
