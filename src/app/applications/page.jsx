import { getAllApplications } from "@/services/application.service"
import { getProjectById } from "@/services/project.service";
import { getUserById } from "@/services/user.service";
import Link from "next/link";
import Tag from "../components/Tag";
import LinkButton from "../components/LinkButton";
import Button from "../components/Button";

export default async function ApplicationsPage() {
    const applications = await getAllApplications();
    return (
        <div className="flex justify-center">
            <div className="w-full md:w-8/12 divide-y divide-gray-400 md:border md:mt-4 md:rounded border-gray-400">
                {
                    !applications || applications.length === 0
                    ? <p>No applications found.</p>
                    : applications.map(mapApplicationToCard)
                }
            </div>
        </div>
    )
}

async function mapApplicationToCard(application, index) {
    const member = await getUserById(application.memberId);
    const project = await getProjectById(application.projectId);
    return <div key={`application-${index}`} 
                className="md:flex justify-between p-2">
                <div className="flex flex-wrap mb-1 md:mb-0 items-center">
                    <Link href={`/profile/${member.username}`} className="text-blue-700 hover:underline mr-1">
                        {member.username}
                    </Link>
                    <p className="mr-1">
                        has applied for
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
                    <Button className="mr-1 text-green-700">Accept</Button>
                    <Button className="text-red-700">Reject</Button>
                </div>
        </div>
    
}
function getBgFromStatus(status) {
    if (!status) return "bg-yellow-100";
    if (status === "accepted") return "bg-green-200";
    if (status === "rejected") return "bg-red-200";
}
