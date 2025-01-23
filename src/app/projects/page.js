import Link from "next/link";
import { getAllProjects } from "@/services/project.service"
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Card from "../components/Card";
import Tag from "../components/Tag";
import LinkButton from "../components/LinkButton";
import { trimProjectDescription } from "../lib/utils";

export default async function ProjectsPage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }
    const isBoard = session.user.role === "board";

    const projects = await getAllProjects();

    return (
        <div className="flex flex-col items-center">
            <div className="w-full md:w-7/12">
                { isBoard &&
                    <Card className="bg-gray-100 flex flex-col items-center">
                    <LinkButton href="/projects/new">Add new project</LinkButton>
                    </Card> }
                {projects.reverse().map((p, index) => mapProjectToCard(p, index, isBoard))}
            </div>
        </div >
    )
}

/**
* @param {Number} index 
* @param {{_id: ObjectId, name: String, description: String, available: Boolean, coordinatorPositions: [String], applications: [ObjectId]}} project 
* */
function mapProjectToCard(project, index, isBoard) {
    return <Link key={`proj-${index}`} href={`/projects/${project.id}`}>
            <Card className="hover:bg-gray-100 max-w-4xl">
                <div className="md:flex justify-between">
                    <p className="text-xl mr-1"><b>{project.name}</b></p>
                    <p className="text-sm text-gray-800">created on {project._id.getTimestamp().toDateString()}</p>
                </div>
                <p>{trimProjectDescription(project.description, 100)}</p>
                <div className="flex flex-wrap mt-2 text-gray-700">
                    {project.coordinatorPositions.map((pos, index) => {
                        return <Tag key={`coor-${index}`} className="mr-2 mt-2">{pos}</Tag>
                    })}

                </div>
                <div className="flex mt-4">
                    <LinkButton className="mr-2" href={`/projects/${project.id}/apply`}>Apply</LinkButton><br />
                    {isBoard && <LinkButton href={`/projects/${project.id}/applications`}>See applications</LinkButton>}
                </div>
            </Card>
        </Link>
}

