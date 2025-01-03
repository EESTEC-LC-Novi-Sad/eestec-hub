import { getAllApplications } from "@/services/application.service"
import { getProjectById } from "@/services/project.service";
import { getUserById } from "@/services/user.service";
import Link from "next/link";

export default async function ApplicationsPage() {
    const applications = await getAllApplications();
    return (
        <div>
            <h1>All applications</h1><br />
            {
                applications.map(async (application, index) => {
                    const member = await getUserById(application.memberId);
                    const project = await getProjectById(application.projectId);
                    return <div key={index}>
                        <Link href={`/applications/${application.id}`}>
                            <b>{member.email} </b>
                            has applied for
                            {application.position
                                ? ` ${application.position} @ `
                                : " "}
                            <b>{project.name}:</b>
                            <p><b>Status: {application.status ?? "pending"}</b>
                            </p>
                        </Link>
                        <br />
                        <br />
                    </div>
                })
            }
        </div>
    )
}
