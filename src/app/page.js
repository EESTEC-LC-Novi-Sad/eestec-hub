import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { getNumOfNotifications } from "@/services/user.service";
import { getProjectsCount } from "@/services/project.service";
import Link from "next/link";

export default async function Home() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }
    const notifications = await getNumOfNotifications(session.user.id);
    const projectCount = await getProjectsCount();

    return (
        <div>
            <h1>Hello, {session.user.firstName}</h1>
            <Link href="/notifications">My notifications: {notifications}</Link>
            <br />
            <Link href="/projects">Available projects: {projectCount}</Link>
        </div >
    );
}
