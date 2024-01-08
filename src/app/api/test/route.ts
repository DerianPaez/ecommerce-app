import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })
  const userId = token?.sub
  return Response.json({ message: 'Hello world', userId })
}
