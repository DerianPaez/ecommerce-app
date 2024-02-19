import prisma from '@/app/lib/prisma'
import { CartItem } from '@prisma/client'
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
        user: {
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
  } catch (error) {
    return NextResponse.json({ message: 'Error adding product to cart', error }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })
  const userId = token?.sub

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId
      },
      include: {
        product: true
      }
    })

    return NextResponse.json(cartItems)
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching cart items', error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get('productId') || undefined

  const token = await getToken({ req: request })
  const userId = token?.sub

  if (!productId) {
    return NextResponse.json({ message: 'Cart id invalid' }, { status: 400 })
  }

  if (!userId) {
    return NextResponse.json({ message: 'User not authenticated' }, { status: 401 })
  }

  try {
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    if (!existingCartItem) {
      return NextResponse.json({ message: 'Cart item not found' }, { status: 400 })
    }

    await prisma.cartItem.delete({
      where: {
        id: existingCartItem.id
      }
    })

    return NextResponse.json({ message: 'Cart item deleted' })
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting cart item', error }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request })
  const userId = token?.sub

  if (!userId) {
    return NextResponse.json({ message: 'User not authenticated' }, { status: 401 })
  }

  try {
    const newCartItems: CartItem[] = await request.json()

    if (!newCartItems) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 })
    }

    await prisma.cartItem.deleteMany({
      where: {
        userId
      }
    })

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        cart: {
          createMany: {
            data: newCartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity
            }))
          }
        }
      },
      include: {
        cart: true
      }
    })

    return NextResponse.json({ message: 'Cart updated successfully' })
  } catch (error) {
    return NextResponse.json({ message: 'Error updating cart', error }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get('productId') || undefined
  const quantity = searchParams.get('quantity') || undefined

  const token = await getToken({ req: request })
  const userId = token?.sub

  if (!productId) {
    return NextResponse.json({ message: 'Product id is required' }, { status: 400 })
  }

  if (!quantity) {
    return NextResponse.json({ message: 'Quantity is required' }, { status: 400 })
  }

  if (!userId) {
    return NextResponse.json({ message: 'User not authenticated' }, { status: 401 })
  }

  try {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        productId,
        userId
      }
    })

    if (!existingCartItem) {
      return NextResponse.json({ message: 'Cart item not found' }, { status: 400 })
    }

    await prisma.cartItem.update({
      where: {
        id: existingCartItem.id
      },
      data: {
        quantity: parseInt(quantity)
      }
    })

    return NextResponse.json({ message: 'Cart item quantity updated' })
  } catch (error) {
    return NextResponse.json({ message: 'Error updating cart item quantity', error }, { status: 500 })
  }
}
