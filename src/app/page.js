import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { getNumOfNotifications } from "@/services/user.service";
import { getProjectsCount } from "@/services/project.service";
import Link from "next/link";
import { put } from "@vercel/blob";
import { uploadProfilePicture } from "@/services/user.service";

export default async function Home() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }
    const notifications = await getNumOfNotifications(session.user.id);
    const projectCount = await getProjectsCount();
    if (!session || !session.user) {
        redirect('/login');
    }

    return (
        <div>
            <h1>Hello, {session.user.firstName}</h1>
            <Link href="/notifications">My notifications: {notifications}</Link>
            <br />
            <Link href="/projects">Available projects: {projectCount}</Link>
            <form action={async (formData) => {
                "use server";

                const imageFile = formData.get('image');
                const blob = await put(imageFile.name, imageFile, {access: "public"});
                const imageUri = blob.url;
                await uploadProfilePicture(session.user.id, imageUri);
            }}>
                <label htmlFor="image">Upload a profile picture</label>
                <input type="file" name="image" id="image"/>
                <button type="submit">Upload</button>
            </form>
        </div >
    );
}
