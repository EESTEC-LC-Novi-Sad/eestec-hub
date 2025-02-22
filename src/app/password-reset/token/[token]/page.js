import { getValidPasswordToken } from "@/services/passwordToken.service";
import { resetPassword } from "@/app/lib/actions";
import Button from "@/app/components/Button";
import ResetPasswordForm from "./ResetPasswordForm";

export default async function PasswordResetByTokenPage({ params }) {
	const { token } = params;
	const passwordToken = await getValidPasswordToken(token);
	if (!passwordToken) {
		return (
			<div className="flex justify-center">
				<h1 className="text-2xl mt-4">Invalid token</h1>
			</div>
		);
	}
	return <ResetPasswordForm token={token} />;
}
