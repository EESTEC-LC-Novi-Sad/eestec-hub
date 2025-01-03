import { getAllTeams } from "@/services/team.service"
import Link from "next/link";

export default async function TeamsPage() {
    const teams = await getAllTeams();
    return (
        <div>
            {teams.map((team, index) => {
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
};
