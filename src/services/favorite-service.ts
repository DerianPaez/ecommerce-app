import prisma from '@/app/lib/prisma'

const addToFavoriteAction = async (productId: string, userId: string) => {
  await prisma.favorite.create({
    data: {
      product: {
        connect: {
          id: productId
        }
      },
      user: {
        connect: {
          id: userId
        }
      }
    }
  })
}

const removeFromFavoriteAction = async (favoriteId: string) => {
  await prisma.favorite.delete({
    where: {
      id: favoriteId
    }
  })
}

const toggleFavorite = async ({ productId }: { productId: string }) => {
  await fetch(`/api/favorite?productId=${productId}`, { method: 'POST' })
}

const getFavoriteItems = async () => {
  const response = await fetch(`/api/favorite`)
  const products = await response.json()
  return products
}

export const favoriteService = {
  toggleFavorite,
  getFavoriteItems,
  addToFavoriteAction,
  removeFromFavoriteAction
}
