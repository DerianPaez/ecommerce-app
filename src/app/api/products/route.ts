import { productService } from '@/services/product-service'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const skip = parseInt(searchParams.get('skip') || '')
  const take = parseInt(searchParams.get('take') || '')

  const token = await getToken({ req: request })
  const userId = token?.sub

  if (!take) {
    return NextResponse.json({ message: 'Take query is required' }, { status: 400 })
  }

  const products = await productService.getProductsAction({ skip, take, userId })

  return NextResponse.json(products)
}
