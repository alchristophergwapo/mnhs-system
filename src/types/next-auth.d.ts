import { Role } from "@/prisma/generated"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: Role
        } & DefaultSession["user"]
    }

    interface User {
        role: Role
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        /** The user's role. */
        role: Role
    }
}