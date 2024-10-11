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
                    return <div key={index}>
                        <p><b>{member.email} </b>{app.motivationalLetter}</p>
                    </div>
                })
            }
        </div >
    )
}
