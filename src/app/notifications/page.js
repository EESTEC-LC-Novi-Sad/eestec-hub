import { getNotificationById } from "@/services/notification.service";
import { getAllUserNotifications } from "@/services/user.service";
import { auth } from "../../../auth"
import Notification from "./notification";

export default async function NotificationsPage() {
    const session = await auth();
    const notificationIds = await getAllUserNotifications(session.user.id);

    const notifications = await Promise.all(notificationIds
        .map(async n => {
            const notification = await getNotificationById(n.notificationId);
            return notification;
        }));

    return (
        <div>
            <h1>Notifications page</h1><br />
            {notifications.reverse().map((n, index) => {
                return <div key={index}><Notification notificationData={n} /><br /></div>
            })}
        </div>
    )
}
