import Credentials from "next-auth/providers/credentials";
import type { Session } from "next-auth";
import { Role } from "@/src/prisma/src/generated/prisma";

export const authConfig = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours 
    },
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize() {
                return null;
            }
        })
    ],

    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string
                token.role = user.role
            }
            return token
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.role = token.role as Role
            }
            return session
        },

        // Edge-safe route protection
        authorized({ auth, request: { nextUrl } }: { auth: Session | null, request: { nextUrl: URL } }) {
            const isLoggedIn = !!auth?.user
            const isPublic = ["/", "/login", "/register"].includes(nextUrl.pathname)
            const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname)

            if (isAuthRoute && isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl))
            }

            if (!isPublic && !isLoggedIn) {
                return Response.redirect(new URL("/login", nextUrl))
            }

            return true
        },
    }
} satisfies Parameters<typeof import("next-auth").default>[0];