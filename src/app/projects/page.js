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
            <a href="/projects/new">Add new project</a><br /><br />
            {
                projects.map((project, index) => {
                    return <div key={index}>
                        <p>{project.name}</p>
                        <a href={`/projects/${project.id}`}>Go to project details</a><br />
                        <a href={`/projects/${project.id}/apply`}>Apply for project</a>
                        <br /><br />
                    </div>
                })
            }
        </div >
    )
}
