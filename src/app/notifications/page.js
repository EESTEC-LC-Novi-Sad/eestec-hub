import { getAllUserNotifications } from "@/services/user.service";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import NotificationsTable from "./notificationsTable";

export default async function NotificationsPage() {
	const session = await auth();
	if (!session || !session.user) {
		redirect("/login");
	}

	const notifications = await getAllUserNotifications(session.user.id);
	return (
		<div className="flex justify-center">
			<NotificationsTable
				userId={session.user.id}
				notifications={notifications.reverse()}
			/>
		</div>
	);
}
