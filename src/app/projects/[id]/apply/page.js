import { applyToProject, getProjectById } from "@/services/project.service";
import { redirect } from "next/navigation";

export default async function ApplyProjectPage({ params }) {
    const project = await getProjectById(params.id);
    return (
        <div>
            <h1>Apply to {project.name}</h1>
            <form action={async (formData) => {
                "use server";
                const applicationData = {
                    motivationalLetter: formData.get("motivation")
                }
                await applyToProject(project.id, applicationData);
                redirect('/projects');
            }}>
                <textarea required name="motivation" placeholder="Your motivation for this project" />
                <button type="submit">Apply</button>
            </form>
        </div>
    )
}
