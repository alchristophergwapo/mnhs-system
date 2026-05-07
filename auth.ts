import NextAuth from "next-auth"
import "next-auth/jwt"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { authConfig } from "./src/auth.config"
import prisma from "./src/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    // debug: !!process.env.AUTH_DEBUG,
    adapter: PrismaAdapter(prisma) as any,

    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log(credentials)
                if ((!credentials?.email && !credentials?.username) || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: {
                        ...(credentials.email ?
                            {
                                email: credentials.email as string,
                            } :
                            {
                                username: credentials.username as string,
                            }
                        )
                    },
                })

                console.log(user)

                if (!user || !user.password) return null;

                const passwordMatch = await bcrypt.compare(credentials.password as string, user.password)

                console.log(passwordMatch)

                if (!passwordMatch) return null;

                return {
                    ...user,
                    id: user.id.toString(),
                    role: user.role,
                }
            }
        })
    ],
})