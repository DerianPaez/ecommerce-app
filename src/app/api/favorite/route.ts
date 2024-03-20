import prisma from '@/app/lib/prisma'
import { favoriteService } from '@/services/favorite-service'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get('productId')

  if (!productId) {
    return NextResponse.json({ message: 'Product id is required' }, { status: 400 })
  }

  const token = await getToken({ req: request })
  const userId = token?.sub

  if (!userId) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 })
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 400 })
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        productId,
        userId
      }
    })

    if (existingFavorite) {
      await favoriteService.removeFromFavoriteAction(existingFavorite.id)
      return NextResponse.json({ message: 'Favorite removed' })
    }

    await favoriteService.addToFavoriteAction(productId, userId)

    return NextResponse.json({ message: 'Product added to favorite' })
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })
  const userId = token?.sub

  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId
      },
      include: {
        product: true
      }
    })

    return NextResponse.json(favorites)
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error }, { status: 500 })
  }
}
