import dbConnect from "@/app/lib/dbConnect";
import Application from "@/models/application";

async function getAllApplications() {
    await dbConnect();
    const applications = await Application.find();
    return applications;
}

async function getApplicationById(id) {
    await dbConnect();
    const application = await Application.findById(id);
    return application;
}

export {
    getAllApplications,
    getApplicationById
}
