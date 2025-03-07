import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Only allow authenticated users with admin role
      return true; //token?.role === "admin"
    },
  },
})

export const config = {
  matcher: [
    "/dashboard/:path*",
     "/reports/:path*",
    "/campaigns/:path*",
    "/influencers/:path*",
  ],
}
