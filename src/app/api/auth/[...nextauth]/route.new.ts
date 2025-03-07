import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

// Export the handler functions directly
const GET = handler.GET
const POST = handler.POST

export { GET, POST }
