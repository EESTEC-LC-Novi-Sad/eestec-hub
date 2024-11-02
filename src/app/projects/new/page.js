import { createProject } from "@/services/project.service";
import { broadcastNotification } from "@/services/notification.service";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import PositionsInput from "./positionsInput";

export default async function NewProjectPage() {
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'board') {
        redirect('/login');
    }

    return (
        <div>
            <h1>New project page</h1> <br />
            <form action={async (formData) => {
                "use server";
                const projectData = {
                    name: formData.get("pname"),
                    description: formData.get("description"),
                    coordinatorPositions: JSON.parse(formData.get("coordinators")),
                    applications: []
                };

                const proj = await createProject(projectData);
                await broadcastNotification({
                    text: `New project is available: ${formData.get("pname")}`,
                    notificationType: "New projects",
                    dateReceived: new Date(Date.now()),
                    link: `/projects/${proj.id}`
                });
                redirect("/projects");
            }}>
                <input required type="text" name="pname" placeholder="Project Name" /><br />
                <br />
                <textarea required name="description" placeholder="Project Description" /><br />
                <br />
                <PositionsInput />
                <br />
                <button type="submit">Create new project</button>
            </form>
        </div>
    )
}
