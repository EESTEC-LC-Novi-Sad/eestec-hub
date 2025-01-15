import { setApplicationStatus, getApplicationById } from "@/services/application.service"
import { sendNotificationById } from "@/services/notification.service";
import { getProjectById } from "@/services/project.service";
import { getUserById } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function ApplicationPage({ params }) {
    const application = await getApplicationById(params.id);
    const member = await getUserById(application.memberId);
    const project = await getProjectById(application.projectId);
    return (
        <div>
            <h1><b>{member.firstName}&apos;s</b> application for <b>{project.name}</b></h1>
            <br />
            {application.position &&
                <p><b>{member.firstName}</b> is applying for <b>{application.position}</b></p>}
            <br />
            <p><b>Motivational letter:</b></p>
            <p style={{ marginLeft: 50 }}>{application.motivationalLetter}</p>
            <br />

            <form action={async () => {
                "use server";

                await setApplicationStatus(params.id, "accepted");
                await sendNotificationById(member.id, {
                    text: `Congratulations! You have been accepted to the ${project.name} project`,
                    notificationType: "Application status",
                    dateReceived: new Date(Date.now()),
                    link: `/projects/${project.id}`
                });
                redirect("/applications");
            }}>
                <button><b>Accept {member.firstName}&apos;s application</b></button>
            </form>
            <br />
            <form action={async () => {
                "use server";

                await setApplicationStatus(params.id, "rejected");
                await sendNotificationById(member.id, {
                    text: `We are sorry! You have been rejected from the ${project.name} project`,
                    notificationType: "Application status",
                    dateReceived: new Date(Date.now()),
                    link: `/projects/${project.id}`
                });
                redirect("/applications");
            }}>
                <button><b>Reject {member.firstName}&apos;s application</b></button>
            </form>
        </div>
    )

    //TODO: make accept and decline buttons work! Before that, alter project model to hold this info
}
