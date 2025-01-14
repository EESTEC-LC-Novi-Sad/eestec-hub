import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { getAllUserNotifications } from "@/services/user.service";
import { getProjectsCount } from "@/services/project.service";
import Link from "next/link";

export default async function Home() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }
    const notifications = await getAllUserNotifications(session.user.id);
    const projectCount = await getProjectsCount();
    if (!session || !session.user) {
        redirect('/login');
    }

    return (
        <div>
            <h1>Hello, {session.user.firstName}</h1>
            <Link href="/notifications">My notifications: {notifications.length}</Link>
            <br />
            <Link href="/projects">Available projects: {projectCount}</Link>
        </div >
    );
}
