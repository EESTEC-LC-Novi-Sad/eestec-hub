import { getAllApplications } from "@/services/application.service"
import { getProjectById } from "@/services/project.service";
import { getUserById } from "@/services/user.service";

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
                        <p><b>{member.email}</b> has applied for <b>{project.name}:</b></p>
                        <p>{application.motivationalLetter}</p><br /><br />
                    </div>
                })
            }
        </div>
    )
}
