import Link from "next/link";
import Button from "../components/Button";
import LoadingButton from "../components/LoadingButton";
import { Separator } from "../lib/utils";
import { signIn } from "../../../auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
	return <LoginForm />;
}
