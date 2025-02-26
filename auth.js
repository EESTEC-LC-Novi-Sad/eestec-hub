import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/services/user.service";
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const user = await getUserByEmail(credentials.email);

				if (!user) {
					throw new Error(`No account found with email ${credentials.email}`);
				}

				if (!user.registered) {
					throw new Error(`You are not registered yet!`);
				}

				const passEqual = await compare(credentials.password, user.password);
				if (!passEqual) {
					throw new Error("Wrong password!");
				}

				return user;
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.firstName = user.firstName;
				token.lastName = user.lastName;
				token.username = user.username;
				token.birthDate = user.birthDate;
				token.dateCreated = user.dateCreated;
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			session.user.id = token.id;
			session.user.username = token.username;
			session.user.firstName = token.firstName;
			session.user.lastName = token.lastName;
			session.user.birthDate = token.birthDate;
			session.user.dateCreated = token.dateCreatedc;
			session.user.role = token.role;

			return session;
		},
	},
});
