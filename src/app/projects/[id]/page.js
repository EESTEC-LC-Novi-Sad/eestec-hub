import { getProjectById } from "@/services/project.service"
import Link from "next/link";
import TeamsIcon from "../../icons/TeamsIcon";
import CheckAllIcon from "../../icons/CheckAllIcon";
import TextFileIcon from "../../icons/TextFileIcon";
import Tag from "../../components/Tag";
import LinkButton from "../../components/LinkButton";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

function Separator() {
    return <div className="border-t border-gray-300 my-2"></div>
}

export default async function ProjectByIdPage({ params }) {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }

    const project = await getProjectById(params.id);
    return (
        <div className="flex justify-center px-2">
            <div className="w-full md:w-6/12">
                <h1 className="text-3xl my-2"><b>{project.name}</b></h1>
                <Separator/>
                <span className="flex gap-1 mb-2 text-sm text-gray-600">
                    <TeamsIcon width="18" height="18"/>
                        {project.applications.length} 
                        {project.applications.length === 1 ? " applicant" : " applicants"}
                </span>
                <p className="text-lg">{project.description}</p>
                <div className="my-4 flex flex-wrap gap-2">
                    { !project.coordinatorPositions || project.coordinatorPositions.length === 0
                        ?<p className="text-gray-700 text-sm">No separate positions available</p>
                        : project.coordinatorPositions.map((position, index) => 
                            <Tag key={index} className="border-gray-300">{position}</Tag>)
                    } 
                </div>
                <div className="flex items-center gap-1">
                    <LinkButton className="flex gap-1" href={`/projects/${params.id}/apply`}><CheckAllIcon/>Apply</LinkButton>
                    { session.user.role === 'board' && 
                        <LinkButton className="flex items-center gap-1" href={`/projects/${params.id}/applications`}><TextFileIcon width="21" height="21"/>Go to applications</LinkButton> }
                </div>
            </div>
        </div>
    )
}
