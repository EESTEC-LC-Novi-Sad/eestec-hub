import { redirect } from "next/navigation";
import { auth, signOut } from "../../auth";
import { getAllUserNotifications } from "@/services/user.service";
import Link from "next/link";

export default async function Home() {
    const session = await auth();
    const notifications = await getAllUserNotifications(session.user.id);
    console.log(notifications);
    if (!session || !session.user) {
        redirect('/login');
    }

    return (
        <div>
            <h1>Hello, {session.user.firstName}</h1>
            <Link href="/notifications">My notifications: {notifications.length}</Link>
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <button>Sign Out</button>
            </form>
        </div >
    );
}
