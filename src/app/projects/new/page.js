import { createProject } from "@/services/project.service";
import { broadcastNotification } from "@/services/notification.service";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import PositionsInput from "./positionsInput";
import Button from "../../components/Button";

function Separator() {
    return <div className="border-t border-gray-300 my-2"></div>
}

export default async function NewProjectPage() {
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'board') {
        redirect('/login');
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-5/12">
                <h1 className="text-2xl mt-4"><b>Create a new project</b></h1> 
                <p className="text-gray-600">All your members will be able to see and apply to this project.
                   Make sure the project name and description are descriptive!</p>
                <Separator />
                <p className="mb-4"><i>Required fields are marked with an asterix (*)</i></p>
                <form className="inline-flex flex-col w-full" action={async (formData) => {
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
                    <label><b>Project name*</b></label>
                    <input className="border h-9 rounded border-gray-300 mb-4" required type="text" name="pname"/>
                    <label><b>Description*</b></label>
                    <textarea className="border rounded border-gray-300 mb-4" required name="description" />
                    <Separator />
                    <PositionsInput />
                    <Separator />
                    <Button className="w-64 mt-4" type="submit">Create new project</Button>
                </form>
            </div>
        </div>
    )
}
