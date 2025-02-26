import { getAllUsers } from "../../services/user.service";
import backupProfileImage from "../../images/profile.jpeg";
import Image from "next/image";
import Link from "next/link";
import Tag from "../components/Tag";
import Button from "../components/Button";
import LinkButton from "../components/LinkButton";
import SearchIcon from "../icons/SearchIcon";
import TeamsIcon from "../icons/TeamsIcon";
import ProfileIcon from "../icons/ProfileIcon";
import RegisterUserButton from "./RegisterUserButton";
import { registerUser } from "../../services/user.service";
import { redirect } from "next/navigation";

export default async function MembersPageUnregisteredTab({ searchParams }) {
	const allUsers = await getAllUsers();
	const users = allUsers.filter((u) => !u.registered);

	const { search } = searchParams;
	const filteredSearch = search?.replaceAll("+", " ");
	const filteredUsers = !filteredSearch
		? users
		: users.filter((user) => filterUsers(user, search));

	const handleRegisterClick = async (userId) => {
		"use server";
		const user = await registerUser(userId);
		if (!user) return;

		redirect("/members?tab=unregistered");
	};

	return (
		<div className="flex flex-col md:flex-row justify-center pt-2">
			<div className="mt-2 mb-2 md:mt-4 md:w-2/12 min-w-48 mr-2 flex justify-center md:justify-start md:flex-col gap-1">
				<LinkButton
					className="w-full mb-1 flex items-center gap-1"
					href="/members?tab=registered"
				>
					<TeamsIcon width="18" height="18" />
					Registered members
				</LinkButton>
				<LinkButton
					className="w-full bg-gray-200 border-b-2 md:border-l-2 md:border-b md:border-b-gray-400 md:border-l-blue-500 border-b-blue-500 flex items-center gap-1"
					href="#"
				>
					<ProfileIcon width="18" height="18" />
					Unregistered members
				</LinkButton>
			</div>
			<div className="flex flex-col items-center pt-2 w-full md:w-9/12">
				<form
					method="get"
					action="/members"
					className="flex mb-2 gap-1 w-full justify-center"
				>
					<input
						type="text"
						defaultValue={filteredSearch ?? ""}
						placeholder="Search for members"
						name="search"
						className="w-full p-2 border border-gray-300 rounded-md"
					/>
					<input hidden name="tab" value="unregistered" />
					<Button
						type="submit"
						className="flex justify-center items-center w-12"
					>
						<SearchIcon width="18" height="18" />
					</Button>
				</form>
				<table className="border-separate border-spacing-0 w-full">
					<thead className="text-left">
						<tr>
							<th className="p-2 md:rounded-tl-md bg-gray-50 border-b border-l border-t border-gray-300">
								<b>Username</b>
							</th>
							<th className="p-2 bg-gray-50 border-b border-t border-gray-300">
								<b>Display name</b>
							</th>
							<th className="p-2 bg-gray-50 border-b border-t hidden md:table-cell  border-gray-300">
								<b>User type</b>
							</th>
							<th className="p-2 bg-gray-50 hidden md:table-cell border-b border-t border-gray-300">
								<b>Email</b>
							</th>
							<th className="p-2 md:rounded-tr-md bg-gray-50 border-b border-t border-r border-gray-300">
								<b>Actions</b>
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user) => (
							<tr key={user._id}>
								<td className="flex items-center gap-2 p-2 border-r border-b">
									<Image
										src={
											(user.imageUri === "removed" ? null : user.imageUri) ||
											backupProfileImage
										}
										alt={user.username}
										width={80}
										height={80}
										className="w-8 h-8 object-cover rounded-full"
									/>
									<Link
										className="text-blue-700 hover:underline"
										href={`/profile/${encodeURI(user.username)}`}
									>
										{user.username}
									</Link>
								</td>
								<td className="p-2 border-r border-b">
									{`${user.firstName} ${user.lastName}`}
								</td>
								<td className="p-2 border-r hidden md:table-cell border-b">
									<Tag
										color={user.role === "board" ? "green" : "blue"}
										className={`w-fit text-gray-600 ${user.role === "board" ? "bg-green-200" : "bg-blue-200"}`}
									>
										{user.role}
									</Tag>
								</td>
								<td className="p-2 border-r border-b hidden md:table-cell">
									{user.email}
								</td>
								<td className="p-2 border-b">
									<RegisterUserButton userId={user._id} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function filterUsers(user, search) {
	const searchLower = search.toLowerCase();

	return (
		user.username.toLowerCase().includes(searchLower) ||
		searchLower.includes(user.username.toLowerCase()) ||
		user.firstName.toLowerCase().includes(searchLower) ||
		searchLower.includes(user.firstName.toLowerCase()) ||
		user.lastName.toLowerCase().includes(searchLower) ||
		searchLower.includes(user.lastName.toLowerCase()) ||
		user.email.toLowerCase().includes(searchLower) ||
		searchLower.includes(user.email.toLowerCase()) ||
		user.location?.toLowerCase().includes(searchLower) ||
		searchLower.includes(user.location?.toLowerCase())
	);
}
