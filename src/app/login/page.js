import Link from "next/link";
import { signIn } from "../../../auth";

export default async function LoginPage() {
    return (
        <div>
            <form action={async (formData) => {
                "use server";
                await signIn("credentials", {
                    email: formData.get("email"),
                    password: formData.get("password"),
                    redirectTo: '/'
                });
            }}>
                <input required type="email" name="email" placeholder="Email" /><br />
                <input required type="password" name="password" placeholder="Password" /><br />
                <button >Login</button>
            </form>
            <Link href="/signup">Signup</Link>
        </div >
    )
}
