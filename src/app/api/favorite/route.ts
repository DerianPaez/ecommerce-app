import prisma from '@/app/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get('productId') || undefined

  const token = await getToken({ req: request })
  const userId = token?.sub

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId || undefined
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
      return NextResponse.json({ message: 'Product already in favorites' }, { status: 400 })
    }

    const newFavorite = await prisma.favorite.create({
      data: {
        product: {
          connect: {
            id: productId || undefined
          }
        },
        User: {
          connect: {
            id: userId || undefined
          }
        }
      }
    })

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

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get('productId') || undefined

  const token = await getToken({ req: request })
  const userId = token?.sub

  try {
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        productId,
        userId
      }
    })

    if (!existingFavorite) {
      return NextResponse.json({ message: 'Favorite not found' }, { status: 400 })
    }

    await prisma.favorite.delete({
      where: {
        id: existingFavorite?.id
      }
    })

    return NextResponse.json({ message: 'Favorite removed' })
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error }, { status: 500 })
  }
}
