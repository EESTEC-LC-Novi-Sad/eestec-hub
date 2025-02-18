import { createProject } from "@/services/project.service";
import { broadcastNotification } from "@/services/notification.service";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import PositionsInput from "./positionsInput";
import Button from "../../components/Button";
import { Separator } from "@/app/lib/utils";
import NewProjectForm from "./NewProjectForm";

export default async function NewProjectPage() {
	const session = await auth();
	if (!session || !session.user || session.user.role !== "board") {
		redirect("/login");
	}

	return <NewProjectForm />;
}
