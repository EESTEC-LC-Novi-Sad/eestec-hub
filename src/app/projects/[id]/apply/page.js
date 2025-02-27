import { applyToProject, getProjectById } from "@/services/project.service";
import { redirect } from "next/navigation";
import Button from "../../../components/Button";
import LinkButton from "../../../components/LinkButton";
import CheckAllIcon from "@/app/icons/CheckAllIcon";
import { Separator } from "@/app/lib/utils";
import ApplyToProjectForm from "./ApplyToProjectForm";

export default async function ApplyProjectPage({ params }) {
	const project = await getProjectById(params.id);
	if (!project) {
		return (
			<div className="flex justify-center">
				<h1 className="text-2xl mt-4">Project not found</h1>
			</div>
		);
	}
	return (
		<div className="flex justify-center">
			<div className="w-full md:w-1/2 px-2">
				<h1 className="text-2xl">
					<b>Apply for project &quot;{project.name}&quot;</b>
				</h1>
				<Separator />
				<p className="mb-4">
					<i>Required fields are marked with an asterix (*)</i>
				</p>
				<ApplyToProjectForm
					projectId={project.id}
					coordinatorPositions={project.coordinatorPositions}
				/>
			</div>
		</div>
	);
}
