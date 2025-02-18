import { auth } from "../../../../auth";
import Button from "../../components/Button";
import NewTeamForm from "./NewTeamForm";

export default async function NewTeamPage() {
	const session = await auth();
	if (!session || !session.user || session.user.role !== "board") {
		redirect("/login");
	}
	return <NewTeamForm />;
}
