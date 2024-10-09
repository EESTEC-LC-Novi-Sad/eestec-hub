import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/services/user.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const user = await getUserByEmail(credentials.email);

                if (!user) {
                    throw new Error(`No user found with email ${credentials.email}`);
                }

                const passEqual = await compare(credentials.password, user.password);
                if (!passEqual) {
                    throw new Error("Passwords are not equal");
                }

                return user;
            }
        })
    ]
});
