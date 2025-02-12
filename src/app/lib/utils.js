import Link from "next/link";
import Tag from "../components/Tag";
import ClockIcon from "../icons/ClockIcon";

/**
 * @param {String} def
 * @param {Number} n
 * */
function trimProjectDescription(def, n) {
	if (def.length <= n) return def;

	return `${def.slice(0, n - 3)}...`;
}

function Separator() {
	return <div className="border-t border-gray-300 my-2" />;
}

/**
 * @param {Number} index
 * @param {{name: String, description: String, startDate: Date, endDate: Date, location: String, code: String, attendies: [ObjectId]}} event
 * */
function mapEventToCard(event, index) {
	const month = event.startDate.toLocaleString("default", { month: "short" });
	const day = event.startDate.getDate();
	const time = event.startDate.toLocaleString("default", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	return (
		<div
			key={`event-${index}`}
			className="flex border border-gray-300 md:rounded mb-1"
		>
			<div className="md:rounded-l mr-3 py-2 bg-gray-900 min-w-24  flex flex-col justify-center items-center">
				<p className="text-white text-3xl">
					<b>{day}</b>
				</p>
				<p className="text-white">{month}</p>
			</div>
			<div>
				<Link href={`/events/${event.id}`}>
					<p className="text-blue-700 text-lg hover:underline mt-2">
						<b>{event.name}</b>
					</p>
				</Link>
				<p>{event.description}</p>
				<Tag className="flex items-center w-fit my-2 bg-yellow-200">
					<ClockIcon className="mr-1" />
					{time}
				</Tag>
			</div>
		</div>
	);
}

export { trimProjectDescription, mapEventToCard, Separator };
