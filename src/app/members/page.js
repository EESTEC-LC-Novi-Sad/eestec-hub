import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getAllUsers } from "../../services/user.service";
import backupProfileImage from "../../images/profile.jpeg";
import Image from "next/image";
import Link from "next/link";
import Tag from "../components/Tag";
import Button from "../components/Button";
import SearchIcon from "../icons/SearchIcon";
import MembersPageRegisteredTab from "./MembersPageRegisteredTab";
import MembersPageUnregisteredTab from "./MembersPageUnregisteredTab";

export default async function MembersPage({ searchParams }) {
	const session = await auth();

	if (!session || !session.user) {
		redirect("/login");
	}
	if (session.user.role !== "board") {
		redirect("/");
	}
	const { tab } = searchParams;
	if (tab === "unregistered") {
		return <MembersPageUnregisteredTab searchParams={searchParams} />;
	}
	return <MembersPageRegisteredTab searchParams={searchParams} />;
}
