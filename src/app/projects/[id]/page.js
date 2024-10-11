import { getProjectById } from "@/services/project.service"
import Link from "next/link";

export default async function ProjectByIdPage({ params }) {
    const project = await getProjectById(params.id);
    return (
        <div>
            <h1>{project.name}</h1><br />
            <p><b>Description: </b>{project.description}</p>
            <p><b>Number of applicants: </b>{project.applications.length}</p>
            <p><b>Currently available: </b>{project.available ? "Yes" : "No"}</p>
            <Link href={`/projects/${params.id}/applications`}>Go to applications</Link><br />
            <Link href={`/projects/${params.id}/apply`}>Apply</Link>
        </div>
    )
}
