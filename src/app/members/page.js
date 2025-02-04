import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getAllUsers } from "../../services/user.service";
import backupProfileImage from "../../images/profile.jpeg";
import Image from "next/image";
import Link from "next/link";
import Tag from "../components/Tag";

export default async function MembersPage() {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/login');
    }
    if (session.user.role !== "board") {
        redirect("/");
    }
    const users = await getAllUsers();
    return (
        <div className="flex justify-center pt-2">
            <table className="border-separate border-spacing-0 w-full md:w-9/12">
                <thead className="text-left">
                    <tr>
                        <th className="p-2 md:rounded-tl-md bg-gray-50 border-b border-l border-t border-gray-300"><b>Username</b></th>
                        <th className="p-2 bg-gray-50 border-b border-t border-gray-300"><b>Display name</b></th>
                        <th className="p-2 bg-gray-50 border-b border-t border-gray-300"><b>User type</b></th>
                        <th className="p-2 bg-gray-50 hidden md:table-cell border-b border-t border-gray-300"><b>Email</b></th>
                        <th className="p-2 md:rounded-tr-md hidden md:table-cell bg-gray-50 border-b border-t border-r border-gray-300"><b>Location</b></th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td className="flex items-center gap-2 p-2 border-r border-b">
                            <Image src={(user.imageUri === "removed" ? null : user.imageUri) || backupProfileImage} alt={user.username} width={80} height={80} className="w-8 h-8 object-cover rounded-full" />
                            <Link className="text-blue-700 hover:underline" href={`/profile/${user.username}`}>{user.username}</Link>
                        </td>
                        <td className="p-2 border-r border-b">
                            {`${user.firstName} ${user.lastName}`}
                        </td>
                        <td className="p-2 border-r border-b">
                            <Tag 
                                color={user.role === "board" ? "green" : "blue"}
                                className={`w-fit text-gray-600 ${user.role === "board" ? "bg-green-200" : "bg-blue-200"}`}>
                            {user.role}
                            </Tag>
                        </td>
                        <td className="p-2 border-r border-b hidden md:table-cell">
                            {user.email}
                        </td>
                        <td className="p-2 border-b hidden md:table-cell">
                            {user.location ?? "N/A"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table> 
        </div>
    )
}
/*
                {users.map((user) => (
                    <li key={user._id}>
                        <div className="flex items-center gap-2">
                            <Image src={(user.imageUri === "removed" ? null : user.imageUri) || backupProfileImage} alt={user.username} width={80} height={80} className="w-10 h-10 object-cover rounded-full" />
                            <Link href={`/profile/${user.username}`}>{user.username}</Link>
                        </div>
                    </li>
                ))}*/
