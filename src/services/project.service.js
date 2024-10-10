import Project from "@/models/project";
import dbConnect from "@/app/lib/dbConnect";
import Application from "@/models/application";
import { auth } from "../../auth";


/**
* @param {Object} projectData 
* @param {String} projectData.name
* @param {String} projectData.description
* */
async function createProject(projectData) {
    await dbConnect();
    await Project.create({ ...projectData });
}

async function getAllProjects() {
    await dbConnect();
    const projects = await Project.find();
    return projects;
}

async function getProjectById(id) {
    await dbConnect();
    const project = await Project.findById(id);
    return project;
}

async function applyToProject(projectId, applicationData) {
    const session = await auth();
    if (!session || !session.user) {
        throw new Error("User must be logged in to apply!");
    }
    await dbConnect();

    const { motivationalLetter } = applicationData;

    const newApplication = await Application.create({
        memberId: session.user.id,
        motivationalLetter
    });

    const project = await Project.findByIdAndUpdate(
        projectId,
        { $push: { applications: newApplication.id } },
        { new: true }
    );
}

export {
    createProject,
    getAllProjects,
    applyToProject,
    getProjectById
}
