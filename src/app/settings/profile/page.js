import { redirect } from "next/navigation";
import { auth } from "../../../../auth"
import { getUserById } from "@/services/user.service";
import Image from "next/image";
import { put } from "@vercel/blob";
import EditButton from "./editButton";
import backupProfileImage from "../../../images/profile.jpeg";

function Separator() {
    return <div className="border-t border-gray-300 my-2"></div>
}

export default async function ProfileSettingsPage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const user = await getUserById(session.user.id);

    const uploadHandler = async (file) => {
        "use server";

        const blob = await put(file.name, file, {access: "public"});
        const imageUri = blob.url;
        await uploadProfilePicture(session.user.id, imageUri);
    }

    return <div className="flex justify-center p-2">
            <div>
                <div className="flex items-center mb-8">
                    <Image src={user?.imageUri ?? backupProfileImage} 
                        alt="Profile picture" width={46} height={46} 
                        className="border border-gray-400 rounded-full mr-4"/>
                    <div>
                        <h2 className="text-2xl text-gray-600">
                            <b className="text-black">{`${user?.firstName} ${user?.lastName}` }</b>
                            {` (${user?.username})`}
                        </h2>
                        <p className="text-gray-600 -mt-1">Your personal account</p>
                    </div>
                </div>
                <h1 className="text-2xl">Public profile</h1>
                <Separator/>
                <div className="flex flex-col md:flex-row-reverse">
                    <div className="md:ml-8">
                        <label><b>Profile picture</b></label>
                        <Image src={user?.imageUri ?? backupProfileImage}
                            alt="Profile picture" width={200} height={200}
                            className="border border-gray-400 rounded-full"/>
                        <EditButton uploadHandler={uploadHandler} className="relative -top-12 left-2"/>
                    </div>
                    <form className="max-w-96">
                        <label htmlFor="fname"><b>First name</b></label>
                        <input type="text" defaultValue={user?.firstName ?? ""} name="fname" className="px-2 border border-gray-300 rounded w-full"/>
                        <label htmlFor="lname"><b>Last name</b></label>
                        <input type="text" defaultValue={user?.lastName ?? ""} name="lname" className="px-2 border border-gray-300 rounded w-full"/>
                        <p className="mt-1 mb-4 text-sm text-gray-600">Your name will may appear when you apply to a project or attend an event. This will make it easier for board members to recognise you!</p>
                        <label htmlFor="bio"><b>Bio</b></label>
                        <textarea type="text" defaultValue={user?.bio ?? ""} name="bio" className="px-2 border border-gray-300 rounded w-full"/>
                        <p className="mt-1 mb-4 text-sm text-gray-600">Tell us a bit about yourself. This will appear on your public profile.</p>
                        <label htmlFor="social"><b>Social account</b></label>
                        <input type="text" defaultValue={user?.socialUrl ?? ""} name="social" placeholder="https://www.instagram.com/username" className="px-2 border border-gray-300 rounded w-full"/>
                    </form>
                </div>
            </div>
        </div>
}
