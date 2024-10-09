import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }

    return (
        <div>
            Prifile page
            <p>{JSON.stringify(session.user)}</p>
        </div>
    )
}
