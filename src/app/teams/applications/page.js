import { getAllTeamApplications, respondToTeamApplication } from "@/services/team.service"
import { getUserById } from "@/services/user.service";
import { getTeamById } from "@/services/team.service";
import { redirect } from "next/navigation";

export default async function TeamApplications() {
    const teamApplications = await getAllTeamApplications();
    return (
        <div>
            <h1>Team applications</h1>
            <br/>
            {teamApplications.map(async (app, index) => {
                const user = await getUserById(app.memberId);
                const team = await getTeamById(app.teamId);
                return <div key={index}>
                           <p><b>{user.email}</b> has applied for <b>{team.name}</b></p> 
                           <p><b>status:</b> {app.status}</p> 
                            <form action={async () => {
                                "use server";
                                
                                await respondToTeamApplication(app.id, "joined");
                                redirect('/teams/applications');
                            }}>
                                <button>Allow</button>
                            </form>
                            <form action={async () => {
                                "use server";
                                
                                await respondToTeamApplication(app.id, "denied");
                                redirect('/teams/applications');
                            }}>
                                <button>Deny</button>
                            </form>
                    </div>
            })}
        </div>
    )
}
