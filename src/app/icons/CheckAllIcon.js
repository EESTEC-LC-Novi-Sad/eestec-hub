export default function CheckAllIcon({ className, width, height }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width ?? "24"}
			height={height ?? "24"}
			viewBox="0 0 24 24"
		>
			<defs>
				<mask id="lineMdCheckAll0">
					<g
						fill="none"
						stroke="#fff"
						strokeDasharray="22"
						strokeDashoffset="22"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
					>
						<path d="M2 13.5l4 4l10.75 -10.75">
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								dur="0.4s"
								values="22;0"
							/>
						</path>
						<path
							stroke="#000"
							strokeWidth="4"
							d="M7.5 13.5l4 4l10.75 -10.75"
							opacity="0"
						>
							<set attributeName="opacity" begin="0.4s" to="1" />
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="0.4s"
								dur="0.4s"
								values="22;0"
							/>
						</path>
						<path d="M7.5 13.5l4 4l10.75 -10.75" opacity="0">
							<set attributeName="opacity" begin="0.4s" to="1" />
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="0.4s"
								dur="0.4s"
								values="22;0"
							/>
						</path>
					</g>
				</mask>
			</defs>
			<rect
				width="24"
				height="24"
				fill="currentColor"
				mask="url(#lineMdCheckAll0)"
			/>
		</svg>
	);
}
