import { getAllUserTeams } from "@/services/team.service";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function UserTeamsPage({params}) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const { username } = params;
    const userTeams = await getAllUserTeams(username);

    return (
        <div>
            <div>Your teams</div>
            {userTeams.map((team, index) => {
                return (
                    <Link key={index} href={`/teams/${team.id}`}>
                        <div>
                            <p>{team.name}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
