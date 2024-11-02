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

async function setApplicationStatus(id, status) {
    await dbConnect();
    await Application.findByIdAndUpdate(
        id,
        { $set: { status: status, responseDate: new Date(Date.now()) } }
    );
}

export {
    getAllApplications,
    getApplicationById,
    setApplicationStatus
}
