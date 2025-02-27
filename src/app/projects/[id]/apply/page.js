import { applyToProject, getProjectById } from "@/services/project.service";
import { redirect } from "next/navigation";
import Button from "../../../components/Button";
import LinkButton from "../../../components/LinkButton";
import CheckAllIcon from "@/app/icons/CheckAllIcon";
import { Separator } from "@/app/lib/utils";
import ApplyToProjectForm from "./ApplyToProjectForm";

export default async function ApplyProjectPage({ params, searchParams }) {
	const project = await getProjectById(params.id);
	if (!project) {
		return (
			<div className="flex justify-center">
				<h1 className="text-2xl mt-4">Project not found</h1>
			</div>
		);
	}
	const { success, failure } = searchParams;
	console.log(searchParams);
	return (
		<div className="flex justify-center">
			{success !== undefined && (
				<div className="flex items-center justify-center absolute top-0 z-50 w-full h-screen bg-gray-900/50">
					<div className="bg-white w-72 p-4 rounded mb-48">
						<p className="text-lg mb-4">
							You have successfully applied to this project!
						</p>
						<div className="flex flex-row-reverse">
							<LinkButton href="/projects">Go back to projects</LinkButton>
						</div>
					</div>
				</div>
			)}
			{failure !== undefined && (
				<div className="flex items-center justify-center absolute top-0 z-50 w-full h-screen bg-gray-900/50">
					<div className="bg-white border-2 w-72 p-4 rounded mb-48">
						<p className="text-md mb-4">
							There has been an error during submission of your application,
							please try again later.
						</p>
						<div className="flex flex-row-reverse">
							<LinkButton href={`/projects/${params.id}/apply`}>
								Okay
							</LinkButton>
						</div>
					</div>
				</div>
			)}
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
