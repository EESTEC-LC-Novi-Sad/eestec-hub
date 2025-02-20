import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import ApplicationsPageProjectsTab from "./ApplicationsPageProjectsTab";
import ApplicationsPageTeamsTab from "./ApplicationsPageTeamsTab";

export default async function ApplicationsPage({ searchParams }) {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/login");
    }
    if (session.user.role !== "board") {
        redirect("/");
    }

    const { tab } = searchParams;
    if (tab === "teams") {
        return <ApplicationsPageTeamsTab />;
    }
    return <ApplicationsPageProjectsTab />;
}
