export default function Card({ children, className }) {
	return (
		<div className={`m-2 p-4 border rounded-md ${className}`}>{children}</div>
	);
}
