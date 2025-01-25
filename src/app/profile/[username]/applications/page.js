import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { getApplicationByUsername } from "@/services/application.service";
import { getProjectById } from "@/services/project.service";
import Link from "next/link";
import Tag from "../../../components/Tag";
import LinkButton from "../../../components/LinkButton";

export default async function ApplicationsByUsernamePage({params}) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const { username } = params;
    const userApps = (await getApplicationByUsername(username)).reverse();
    return (
        <div className="flex justify-center">
            <div className="w-full md:w-8/12">
                <h1 className="text-2xl ml-2"><b>Your project applications</b></h1>
                    <div className="divide-y divide-gray-400 md:border md:mt-4 md:rounded border-gray-400">
                        { !userApps || userApps.length === 0
                            ? <p>You have no applications</p>
                            : userApps.map(mapApplicationToCard)
                        }
                    </div>
            </div>
        </div>
    )
}

async function mapApplicationToCard(application, index) {
    const project = await getProjectById(application.projectId);
    return <div key={`application-${index}`} 
                className="md:flex justify-between p-2">
                <div className="flex flex-wrap mb-1 md:mb-0 items-center">
                    <p className="mr-1">
                        You have applied for
                        {application.position ? ` ${application.position} @` : " "}
                    </p>
                    <Link href={`/projects/${project.id}`} className="text-blue-700 hover:underline mr-1">
                        {project.name}
                    </Link>
                    <Tag className={
                        `w-fit mb-2 md:mb-0 flex items-center hidden md:block border-gray-300
                        ${getBgFromStatus(application.status)} `}>
                    {application.status ? application.status : "pending"}
                    </Tag>
                </div>
                <Tag className={
                    `w-fit mb-2 md:mb-0 flex items-center md:hidden border-gray-300
                    ${getBgFromStatus(application.status)} `}>
                {application.status ? application.status : "pending"}
                </Tag>
                <div className="flex items-center">
                    <LinkButton href={`/applications/${application.id}`} className="mr-1">View application</LinkButton>
                </div>
        </div>
    
}
function getBgFromStatus(status) {
    if (!status) return "bg-yellow-100";
    if (status === "accepted") return "bg-green-200";
    if (status === "rejected") return "bg-red-200";
}
