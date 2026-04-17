import type { NextAuthConfig } from "next-auth"

// Lightweight config used by middleware (no Prisma, no bcrypt — Edge-safe)
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      if (isOnAdmin) {
        if (isLoggedIn) return true
        return false
      }
      return true
    },
  },
  providers: [],
}
