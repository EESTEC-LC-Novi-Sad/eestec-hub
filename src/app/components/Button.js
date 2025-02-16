export default function Button({
	children,
	className,
	onClick,
	type,
	disabled,
}) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled ?? false}
			className={`p-1 border border-solid border-gray-400 rounded 
           hover:bg-gray-200
           ${className}`}
		>
			{children}
		</button>
	);
}
