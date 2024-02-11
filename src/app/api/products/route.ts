import prisma from '@/app/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productsLength = parseInt(searchParams.get('productsLength') || '')
  const productsToShow = parseInt(searchParams.get('productsToShow') || '')

  const token = await getToken({ req: request })
  const userId = token?.sub

  if (!productsToShow) {
    return NextResponse.json({ message: 'productsToShow query is required' }, { status: 400 })
  }

  const newProducts = await prisma.product.findMany({
    skip: productsLength || 0,
    take: productsToShow
  })

  if (userId) {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId
      }
    })

    const productsWithFavorites = newProducts.map((product) => {
      const isFavorite = favorites.some((favorite) => favorite.productId === product.id)
      return { ...product, isFavorite }
    })

    return NextResponse.json(productsWithFavorites)
  }

  return NextResponse.json(newProducts)
}
