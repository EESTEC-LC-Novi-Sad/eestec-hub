import { getApplicationById } from "@/services/application.service"
import { getProjectById } from "@/services/project.service";
import { getUserById } from "@/services/user.service";

export default async function ApplicationPage({ params }) {
    const application = await getApplicationById(params.id);
    const member = await getUserById(application.memberId);
    const project = await getProjectById(application.projectId);
    return (
        <div>
            <h1><b>{member.firstName}'s</b> application for <b>{project.name}</b></h1>
            <br />
            {application.position &&
                <p><b>{member.firstName}</b> is applying for <b>{application.position}</b></p>}
            <br />
            <p><b>Motivational letter:</b></p>
            <p style={{ marginLeft: 50 }}>{application.motivationalLetter}</p>
            <br />
            <form>
                <button><b>Accept {member.firstName}'s application</b></button>
            </form>
            <br />
            <form>
                <button><b>Decline {member.firstName}'s application</b></button>
            </form>
        </div>
    )
}
