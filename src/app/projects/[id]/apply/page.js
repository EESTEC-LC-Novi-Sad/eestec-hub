import { applyToProject, getProjectById } from "@/services/project.service";
import { redirect } from "next/navigation";
import Button from "../../../components/Button";
import LinkButton from "../../../components/LinkButton";
import CheckAllIcon from "@/app/icons/CheckAllIcon";

function Separator() {
    return <div className="border-t border-gray-300 my-2"></div>
}

export default async function ApplyProjectPage({ params, searchParams }) {
    const project = await getProjectById(params.id);
    const { success, failure } = searchParams;
    console.log(searchParams);
    return (
        <div className="flex justify-center">
            {success !== undefined &&
                <div className="flex items-center justify-center absolute top-0 z-50 w-full h-screen bg-gray-900/50">
                    <div className="bg-white w-72 p-4 rounded mb-48">
                        <p className="text-lg mb-4">You have successfully applied to this project!</p>
                        <div className="flex flex-row-reverse">
                            <LinkButton href="/projects">Go back to projects</LinkButton>
                        </div>
                    </div>
                </div>}
            {failure !== undefined &&
                <div className="flex items-center justify-center absolute top-0 z-50 w-full h-screen bg-gray-900/50">
                    <div className="bg-white border-2 w-72 p-4 rounded mb-48">
                        <p className="text-md mb-4">There has been an error during submission of your application, please try again later.</p>
                        <div className="flex flex-row-reverse">
                            <LinkButton href={`/projects/${params.id}/apply`}>Okay</LinkButton>
                        </div>
                    </div>
                </div>}
            <div className="w-full md:w-1/2 px-2">
                <h1 className="text-2xl"><b>Apply for project &quot;{project.name}&quot;</b></h1>
                <Separator />
                <p className="mb-4"><i>Required fields are marked with an asterix (*)</i></p>
                <form action={async (formData) => {
                    "use server";
                    const applicationData = {
                        motivationalLetter: formData.get("motivation"),
                        position: formData.get("position")
                    }
                    const success = await applyToProject(project.id, applicationData);
                    if (success) {
                        redirect(`/projects/${params.id}/apply?success`);
                        return;
                    }
                    redirect(`/projects/${params.id}/apply?failure`);
                }}>
                    {project.coordinatorPositions && project.coordinatorPositions.length > 0 &&
                        <div>
                            <label for="position"><b>Applying for*</b></label>
                            <select id="position" name="position" required className="w-full px-2">
                                <option value="">--Please select a position--</option>
                                {project.coordinatorPositions.map((c, index) => {
                                    return <option name={c.toLowerCase()} key={index}>{c}</option>
                                })}
                            </select>
                            <p className="mt-1 mb-4 text-sm text-gray-600">If you want to apply for more than one position, you will have to fill-out this application multiple times!</p>
                        </div>
                    }
                    <label for="motivation"><b>Motivation*</b></label>
                    <textarea className="w-full border rounded-md px-2 border-gray-300" required name="motivation" placeholder="Why do you want to work on this project?" />
                    <p className="mt-1 mb-4 text-sm text-gray-600">Make sure to write at least 150 words, this is the most important part of your application.</p>
                    <input type="hidden" />
                    <Separator />
                    <div className="flex flex-row-reverse">
                        <Button className="flex gap-1 justify-center w-full md:w-3/12" type="submit">
                            <CheckAllIcon />
                            Apply
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
