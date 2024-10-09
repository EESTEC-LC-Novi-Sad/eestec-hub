import { createUser } from "@/services/user.service";
import { redirect } from "next/navigation";

export default function SignUp() {
    return (
        <div>
            <form action={async (formData) => {
                "use server";
                const email = formData.get("email");
                const password = formData.get("password");
                const rpassword = formData.get("rpassword");
                if (password !== rpassword) {
                    throw (new Error("Passwords do not match!"))
                }
                await createUser(email, password);
                redirect("/login");
            }}>
                <input required type="email" name="email" placeholder="Email" /><br />
                <input required type="password" name="password" placeholder="Password" /><br />
                <input required type="password" name="rpassword" placeholder="Repeat Password" /><br />
                <button >Signup</button>
            </form>
            <a href="/login">Login</a>
        </div>
    )
}
