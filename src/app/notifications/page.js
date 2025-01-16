import { getNotificationById } from "@/services/notification.service";
import { getAllUserNotifications } from "@/services/user.service";
import { auth } from "../../../auth"
import { redirect } from "next/navigation";
import NotificationsTable from "./notificationsTable";

export default async function NotificationsPage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const notificationIds = await getAllUserNotifications(session.user.id);
    const notifications = await Promise.all(notificationIds
        .map(async n => {
            const notification = await getNotificationById(n.notificationId);
            return notification?._doc ?? undefined;
        }));

    return (
        <div>
            <NotificationsTable userId={session.user.id} notifications={notifications.reverse()}/>
        </div>
    )
}
