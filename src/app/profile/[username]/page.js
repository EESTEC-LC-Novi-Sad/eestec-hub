import { getUserByUsername } from "@/services/user.service";

export default async function ProfilePage({params}) {
    const user = await getUserByUsername(params.username);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!dateString) return "Unknown";
        return date.toLocaleDateString();
    }

    return (
        <div>
            {user 
              ? <div>
                    <p><b>Email: </b>{user?.email}</p>
                    <p><b>First name: </b>{user?.firstName}</p>
                    <p><b>Last name: </b>{user?.lastName}</p>
                    <p><b>Birth date: </b>{formatDate(user?.birthDate)}</p>
                    <p><b>Role: </b>{user?.role}</p>
                    <p><b>Date created: </b>{formatDate(user?.dateCreated)}</p>
                </div> 
              : <p>User not found</p>
            }
        </div>
    )
}
