import prisma from '@/app/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get('productId') || undefined

  const token = await getToken({ req: request })
  const userId = token?.sub

  const product = await prisma.product.findUnique({
    where: {
      id: productId || undefined
    }
  })

  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      userId
    }
  })

  if (existingCartItem) {
    await prisma.cartItem.update({
      where: {
        id: existingCartItem.id
      },
      data: {
        quantity: existingCartItem.quantity + 1
      }
    })

    return NextResponse.json({ message: 'Cart item quantity updated' })
  }

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 400 })
  }

  const newCartItem = await prisma.cartItem.create({
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
      },
      quantity: 1
    },
    include: {
      product: true
    }
  })

  return NextResponse.json({ message: 'Product added to cart', newCartItem })
}

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })
  const userId = token?.sub

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId
    },
    include: {
      product: true
    }
  })

  return NextResponse.json(cartItems)
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cartId = searchParams.get('cartId') || undefined

  if (!cartId) {
    return NextResponse.json({ message: 'Cart id invalid' }, { status: 400 })
  }

  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      id: cartId
    }
  })

  if (!existingCartItem) {
    return NextResponse.json({ message: 'Cart item not found' }, { status: 400 })
  }

  await prisma.cartItem.delete({
    where: {
      id: existingCartItem?.id
    }
  })

  return NextResponse.json({ message: 'Cart item removed from cart' })
}
