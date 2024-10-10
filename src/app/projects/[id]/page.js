import { getProjectById } from "@/services/project.service"

export default async function ProjectByIdPage({ params }) {
    const project = await getProjectById(params.id);
    return (
        <div>{project.name}</div>
    )
}
