import { redirect } from "next/navigation";
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
        </div>
    );
}
