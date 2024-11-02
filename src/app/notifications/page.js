import { getNotificationById } from "@/services/notification.service";
import { auth } from "../../../auth"
import Notification from "./notification";

export default async function NotificationsPage() {
    const session = await auth();

    const notifications = await Promise.all(session.user?.notifications.map(async n => {
        const notification = await getNotificationById(n.notificationId);
        return notification;
    }));

    return (
        <div>
            <h1>Notifications page</h1><br />
            {notifications.map((n, index) => {
                return <Notification key={index} notificationData={n} />
            })}
        </div>
    )
}
