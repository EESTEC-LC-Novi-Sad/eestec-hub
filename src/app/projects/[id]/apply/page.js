import { applyToProject, getProjectById } from "@/services/project.service";
import { redirect } from "next/navigation";

export default async function ApplyProjectPage({ params }) {
    const project = await getProjectById(params.id);
    return (
        <div>
            <h1>Apply to {project.name}</h1>
            <br/>
            <form action={async (formData) => {
                "use server";
                const applicationData = {
                    motivationalLetter: formData.get("motivation"),
                    position: formData.get("position")
                }
                await applyToProject(project.id, applicationData);
                redirect('/projects');
            }}>
                <label for="position">Applying for:</label>
                <br/>
                <select id="position" name="position">
                    <option value="">--Please select a position--</option>
                    {project.coordinatorPositions.map((c, index) => {
                        return <option name={c.toLowerCase()} key={index}>{c}</option>
                    })}
                </select>
                <br/><br/>
                <textarea required name="motivation" placeholder="Your motivation for this project" />
                <br/>
                <button type="submit">Apply</button>
            </form>
        </div>
    )
}
