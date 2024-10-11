import Link from "next/link";
import { getAllProjects } from "@/services/project.service"
import { auth } from "../../../auth";

export default async function ProjectsPage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }

    const projects = await getAllProjects();

    return (
        <div>
            <h1>Projects page</h1>
            <Link href="/projects/new">Add new project</Link><br /><br />
            {
                projects.map((project, index) => {
                    return <div key={index}>
                        <p>{project.name}</p>
                        <Link href={`/projects/${project.id}`}>Go to project details</Link><br />
                        <Link href={`/projects/${project.id}/apply`}>Apply for project</Link><br />
                        <Link href={`/projects/${project.id}/applications`}>Go to applications</Link>
                        <br /><br />
                    </div>
                })
            }
        </div >
    )
}
