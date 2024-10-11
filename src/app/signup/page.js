import { createUser } from "@/services/user.service";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUp() {
    return (
        <div>
            <form action={async (formData) => {
                "use server";
                const password = formData.get("password");
                const rpassword = formData.get("rpassword");
                if (password !== rpassword) {
                    throw (new Error("Passwords do not match!"))
                }

                const userData = {
                    email: formData.get("email"),
                    firstName: formData.get("fname"),
                    lastName: formData.get("lname"),
                    birthDate: new Date(formData.get("birth")),
                    password: password,
                    rpassword: rpassword,
                }

                await createUser(userData);
                redirect("/login");
            }}>
                <input required type="email" name="email" placeholder="Email" /><br />
                <input required type="text" name="fname" placeholder="First Name" /><br />
                <input required type="text" name="lname" placeholder="Last Name" /><br />
                <input required type="datetime-local" name="birth" placeholder="Date of Birth" /><br />
                <input required type="password" name="password" placeholder="Password" /><br />
                <input required type="password" name="rpassword" placeholder="Repeat Password" /><br />
                <button >Signup</button>
            </form>
            <Link href="/login">Login</Link>
        </div>
    )
}
