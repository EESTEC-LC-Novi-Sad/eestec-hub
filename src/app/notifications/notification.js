import Link from "next/link";

export default function Notification({ notificationData }) {
    return <div>
        <Link href={notificationData.link}>{notificationData.text}</Link>
    </div>
}
