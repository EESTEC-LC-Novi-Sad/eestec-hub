import { getAllProjectsByUsername } from "@/services/project.service";
import Link from "next/link";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

export default async function UserProjectPage({params}) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const { username } = params;
    const userProjects = await getAllProjectsByUsername(username);

    return (
        <div>
            <div>These are your projects</div>
            { !userProjects || userProjects.length === 0 
              ? <p>You have no projects</p> 
              : userProjects.map((project, index) => {
                    return <div key={index}>
                        <p><b>{project.name}</b></p>
                        <Link href={`/projects/${project.id}`}>Go to project details</Link><br />
                        <Link href={`/projects/${project.id}/apply`}>Apply for project</Link><br />
                        <Link href={`/projects/${project.id}/applications`}>Go to applications</Link>
                        <br /><br />
                    </div>
                })
            }
        </div>
    )
}
