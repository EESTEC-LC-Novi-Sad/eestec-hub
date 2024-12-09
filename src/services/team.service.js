import dbConnect from "@/app/lib/dbConnect";
import Team from "@/models/team";
import TeamApplication from "@/models/teamApplication";

async function joinTeam(teamId, memberId) {
    await dbConnect();
    const app = await TeamApplication.create({
        teamId,
        memberId,
        status: 'pending',
    });

    await Team.findByIdAndUpdate(teamId, {$addToSet: {teamMembers: app.id}})
}

async function getAllTeamApplications() {
    await dbConnect();
    const applications = await TeamApplication.find();
    return applications;
}

async function getTeamApplicationById(id) {
    await dbConnect();
    const app = await TeamApplication.findById(id)
    return app;
}

async function respondToTeamApplication(appId, status) {
    await TeamApplication.findByIdAndUpdate(
        appId,
        {$set: {status}}
    );
}

async function getTeamById(id) {
    await dbConnect();
    const team = await Team.findById(id);
    return team;
}


async function getAllTeams() {
    await dbConnect();
    const teams = await Team.find();
    return teams;
}

/**
* @param {{name: String, description: String}} teamData 
* */
async function createNewTeam(teamData) {
    await dbConnect();
    const team = await Team.create({ ...teamData });
    return team;
}

export {
    getAllTeams,
    createNewTeam,
    getTeamById,
    joinTeam,
    getAllTeamApplications,
    respondToTeamApplication,
    getTeamApplicationById
}
