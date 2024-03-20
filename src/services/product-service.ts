import prisma from '@/app/lib/prisma'
import { ProductUi } from '@/context/products-context'

async function getProductsAction({
  skip,
  take = 1,
  userId
}: {
  skip: number
  take?: number
  userId?: string
}): Promise<ProductUi[]> {
  const newProducts = await prisma.product.findMany({
    skip,
    take,
    orderBy: {
      updatedAt: 'desc'
    }
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

    return productsWithFavorites
  }

  return newProducts
}

async function getTotalProductsAction() {
  return await prisma.product.count()
}

const getProducts = async ({ skip, take = 1 }: { skip: number; take?: number }) => {
  const response = await fetch(`/api/products?skip=${skip}&take=${take}`)
  const products = await response.json()
  return products
}

export const productService = {
  getProducts,
  getProductsAction,
  getTotalProductsAction
}
