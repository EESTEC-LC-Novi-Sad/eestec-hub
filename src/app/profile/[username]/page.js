import { getUserByUsername } from "@/services/user.service";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import backupProfileImage from "../../../images/profile.jpeg";
import Button from "../../components/Button";
import LinkButton from "../../components/LinkButton";
import LocationIcon from "@/app/icons/LocationIcon";
import CakeIcon from "@/app/icons/CakeIcon";
import { getAllProjectsByUsername } from "@/services/project.service";
import { getAllEventsByUsername } from "@/services/events.service";
import Link from "next/link";
import { trimProjectDescription } from "../../lib/utils";

function Separator() {
    return <div className="border-t border-gray-300 my-2"></div>
}

export default async function ProfilePage({params}) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const user = await getUserByUsername(params.username);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!dateString) return "Unknown";
        return date.toLocaleDateString();
    }
    const userProjects = await getAllProjectsByUsername(params.username);
    const userEvents = await getAllEventsByUsername(params.username);

    return (
        <div className="flex justify-center">
         {user ?
             <div className="w-full"> 
                 <div className="md:flex justify-center">
                    <div className="flex flex-col ml-2 mr-2 mt-8 md:w-3/12">
                        <div className="flex md:block">
                            <Image 
                                src={user?.imageUri ?? backupProfileImage} 
                                alt="Profile picture" width={300} height={300} 
                                className="border border-gray-400 w-3/12 md:w-full rounded-full mb-3"/>
                            <div className="w-full ml-2 md:ml-0">
                                <h1 className="text-3xl"><b>{`${user?.firstName} ${user?.lastName}`}</b></h1>
                                <p className="text-xl text-gray-600 mb-2"><b>{user?.username}</b></p>
                            </div>
                        </div>
                        <p className="text-lg mb-2">Software Engineering Student</p>
                        <Button>Edit profile</Button>
                        <span className="flex items-center mt-2"><LocationIcon className="mr-1"/> Novi Sad</span>
                        <span className="flex items-center mb-4"><CakeIcon className="mr-1"/> {formatDate(user?.birthDate)}</span>
                        <Separator/>
                        <h2 className="text-xl"><b>Achivements</b></h2>
                        <p className="text-gray-600 mb-4">Coming soon... :D</p>
                        <Separator/>
                        <h2 className="text-xl"><b>Teams</b></h2>
                        <p className="text-gray-600">Coming soon... :D</p>

                    </div>
                    <div className="md:w-fit mt-8 md:ml-6 ml-2">
                        <h1 className="text-2xl"><b>Projects</b></h1>
                        <div className="flex flex-wrap ">
                            {userProjects.length > 0 
                                ? userProjects.map(mapProjectToSmallCard)
                                : <p className="text-gray-600 mt-4">No projects found</p>
                            }
                        </div> 
                         <Link href="/projects" className="mx-2 text-blue-700 hover:underline">
                         Apply for more projects
                         </Link>
                    </div> 
                  </div>
              </div>
             : <p>User not found</p> }
        </div>
    )
}

function mapProjectToSmallCard(project) {
    return <div key={project._id} 
            className="flex justify-between border 
                        border-gray-300 rounded p-2 mt-2 w-96 h-20 mr-2">
            <div>
                <h1 className="text-xl"><b>{project.name}</b></h1>
                <p className="text-sm text-gray-600">{trimProjectDescription(project.description, 40)}</p>
            </div>
            <LinkButton href={`/projects/${project.id}`} className="mt-3">View</LinkButton>
    </div>
}
