import { redirect } from "next/navigation";
import { multicastNotification } from "@/services/notification.service";
import { auth, signOut } from "../../auth";

export default async function Home() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }

    return (
        <div>
            <h1>Hello, {session.user.firstName}</h1>
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <button>Sign Out</button>
            </form>
            <form action={async () => {
                'use server';

                const notificationData = {
                    text: "This is a test notification",
                    notificationType: "test notification",
                    dateReceived: new Date(Date.now()),
                    link: "www.google.com"
                }
                await multicastNotification(notificationData, "board")

            }}>
                <button>send notification</button>

            </form>
        </div >
    );
}
