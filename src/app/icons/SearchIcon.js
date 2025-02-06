export default function SearchIcon({ className, width, height }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width ?? "24"}
			height={height ?? "24"}
			viewBox="0 0 1000 1000"
		>
			<path
				fill="currentColor"
				d="m746 641l254 255l-105 105l-254-254q-106 72-232 72q-169 0-289-120T0 410t120-289T409 1t289 120t120 289q0 127-72 231zm-65-231q0-113-79.5-193T409 137t-193 80t-80 193t80 192.5T409 682t192.5-79.5T681 410z"
			/>
		</svg>
	);
}
