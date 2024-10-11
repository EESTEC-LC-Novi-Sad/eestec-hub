import dbConnect from "@/app/lib/dbConnect";
import Application from "@/models/application";

async function getAllApplications() {
    await dbConnect();
    const applications = await Application.find();
    return applications;
}

export {
    getAllApplications
}
