export default function LoadingIcon({ className, width, height }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width ?? "128"}
			height={height ?? "128"}
			viewBox="0 0 24 24"
		>
			<path
				fill="currentColor"
				fillOpacity=".9"
				d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75v-2.438A7.312 7.312 0 1 1 19.313 12h2.437c0-5.384-4.366-9.75-9.75-9.75Z"
			/>
		</svg>
	);
}
