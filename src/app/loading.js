import LoadingIcon from "./icons/LoadingIcon";

export default async function Loading() {
	return (
		<div className="w-screen h-screen text-white bg-gray-400 flex justify-center items-center">
			<LoadingIcon width="56" height="56" className="mb-28 animate-spin" />
		</div>
	);
}
