import { auth, signOut } from "../../../auth";
import { redirect } from "next/navigation";
import Button from "../components/Button";

export default async function ProfilePage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }

    return (
        <div>
            Profile page
            <p><b>Email: </b>{session.user.email}</p>
            <p><b>First name: </b>{session.user.firstName}</p>
            <p><b>Last name: </b>{session.user.lastName}</p>
            <p><b>Birth date: </b>{Date(session.user.birthDate).toString()}</p>
            <p><b>Role: </b>{session.user.role}</p>
            <p><b>Date created: </b>{session.user.dateCreated ?? "Unknown"}</p>
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <Button>Sign Out</Button>
            </form>
        </div>
    )
}
