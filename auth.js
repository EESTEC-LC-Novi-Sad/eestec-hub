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
                //We need logic for user auth (database and such)
                const user = await getUserByEmail(credentials.email);
                if (!user) {
                    console.log("User not found");
                    throw new Error(`No user found with email ${credentials.email}`);
                }
                console.log("Got user");

                return user;
            }
        })
    ]
});
