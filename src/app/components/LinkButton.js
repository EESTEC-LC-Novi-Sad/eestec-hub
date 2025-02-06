import Link from "next/link";

export default function LinkButton({ href, children, className }) {
	return (
		<div>
			<Link href={href} passHref legacyBehavior>
				<a
					className={`inline-block p-1 border rounded border-solid border-gray-400 hover:bg-gray-200 ${className}`}
				>
					{children}
				</a>
			</Link>
		</div>
	);
}
