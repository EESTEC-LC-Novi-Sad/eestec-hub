import Link from "next/link";
import { getApplicationsForProject, getProjectById } from "@/services/project.service"
import { getUserById } from "@/services/user.service";

export default async function ProjectApplicationsPage({ params }) {
    const applications = await getApplicationsForProject(params.id);
    const project = await getProjectById(params.id);

    return (
        <div>
            <h1>{project.name} application page</h1><br />
            {
                applications.map(async (app, index) => {
                    const member = await getUserById(app.memberId);
                    return <Link href={`/applications/${app.id}`} key={index}>
                        <div>
                            <p> <b>{member.email} </b>
                                {app.position ? `applied for ${app.position}: ` : `applied: ${app.motivationalLetter.slice(0, 20)}...`}
                            </p>
                            <p><b>Status: {app.status ?? "pending"}</b></p>
                        </div>
                    </Link>
                })
            }
        </div >
    )
}
