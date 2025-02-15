import ApplicationsPageProjectsTab from "./ApplicationsPageProjectsTab";
import ApplicationsPageTeamsTab from "./ApplicationsPageTeamsTab";

export default async function ApplicationsPage({ searchParams }) {
	const { tab } = searchParams;
	if (tab === "teams") {
		return <ApplicationsPageTeamsTab />;
	}
	return <ApplicationsPageProjectsTab />;
}
