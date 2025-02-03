import { redirect } from "next/navigation";
import { auth } from "../../../../auth"
import { getUserById } from "@/services/user.service";
import Image from "next/image";
import backupProfileImage from "../../../images/profile.jpeg";
import ProfileForm from "./ProfileForm";

function Separator() {
    return <div className="border-t border-gray-300 my-2"></div>
}

export default async function ProfileSettingsPage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const user = await getUserById(session.user.id);
    const profileImageSrc = (user?.imageUri === "removed" ? null : user?.imageUri) ?? backupProfileImage;

    return <div className="flex justify-center p-2">
            <div>
                <div className="flex items-center mb-8">
                    <Image src={profileImageSrc} 
                        alt="Profile picture" width={80} height={80} 
                        className="border border-gray-400 rounded-full h-16 w-16 object-cover mr-4"/>
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
                <ProfileForm userStr={JSON.stringify(user)}/>
            </div>
        </div>
}
