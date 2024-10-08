import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                //We need logic for user auth (database and such)
                let user = {
                    email: credentials.email,
                    password: credentials.password
                };

                console.log(user);
                return user;
            }
        })
    ]
});
