import { getAllTeams } from "@/services/team.service"
import Link from "next/link";

export default async function TeamsPage() {
    const teams = await getAllTeams();
    return (
        <div>
            {teams.map((team, index) => {
                return (
                    <Link href={`/teams/${team.id}`}>
                        <div key={index}>
                            <p>{team.name}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
};
