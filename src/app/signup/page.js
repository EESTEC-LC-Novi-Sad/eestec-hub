import { createUser } from "@/services/user.service";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "../components/Button";
import { Separator } from "../lib/utils";
import SignupRequestForm from "./SignupRequestForm";

export default async function SignUp() {
	return <SignupRequestForm />;
}
