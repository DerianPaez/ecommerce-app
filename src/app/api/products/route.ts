import prisma from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productsLength = parseInt(searchParams.get('productsLength') || '')
  const productsToShow = parseInt(searchParams.get('productsToShow') || '')
  if (!productsToShow) {
    return NextResponse.json({ message: 'productsToShow query is required' }, { status: 400 })
  }
  const newProducts = await prisma.product.findMany({
    skip: productsLength || 0,
    take: productsToShow
  })
  return NextResponse.json(newProducts)
}
