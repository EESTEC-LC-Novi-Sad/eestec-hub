import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { getApplicationByUsername } from "@/services/application.service";
import { getProjectById } from "@/services/project.service";
import Link from "next/link";


export default async function ApplicationsByUsernamePage({params}) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const { username } = params;
    const userApps = (await getApplicationByUsername(username)).reverse();
    return (
        <div>
            <h1>Your personal applications</h1>
            <br />
            {
                userApps.map(async (application, index) => {
                    const project = await getProjectById(application.projectId);
                    return <div key={index}>
                        <Link href={`/applications/${application.id}`}>
                            You have applied for
                            {application.position
                                ? ` ${application.position} @ `
                                : " "}
                            <b>{project.name}:</b>
                            <p><b>Status: {application.status ?? "pending"}</b>
                            </p>
                        </Link>
                        <br />
                    </div>
                })
            }
        </div>
    )
}
