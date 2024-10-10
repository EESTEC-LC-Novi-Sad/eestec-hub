import { createProject } from "@/services/project.service";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function NewProjectPage() {
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'board') {
        redirect('/login');
    }

    return (
        <div>
            New project page
            <form action={async (formData) => {
                "use server";
                const projectData = {
                    name: formData.get("pname"),
                    description: formData.get("description"),
                    applications: []
                };

                await createProject(projectData);
                redirect("/projects");
            }}>
                <input required type="text" name="pname" placeholder="Project Name" /><br />
                <textarea required name="description" placeholder="Project Description" /><br />
                <button type="submit">Create new project</button>
            </form>
        </div>
    )
}
