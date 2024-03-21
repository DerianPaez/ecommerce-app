'use client'

import { favoriteService } from '@/services/favorite-service'
import { productService } from '@/services/product-service'
import { Favorite, Product } from '@prisma/client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useGlobal } from './global/global.context'
import { GlobalActions } from './global/types'

type ProductContextProviderProps = {
  children: React.ReactNode
  initialProducts: ProductUi[]
  totalProducts: number
}

export type ProductUi = Product & { isFavorite?: boolean }

export type FavoriteWithProduct = Favorite & { product: ProductUi }

type ProductContext = {
  products: ProductUi[]
  loadProducts: (params: { skip: number; take?: number }) => Promise<void>
  markAsFavorite: (params: { productId: string; isFavorite: boolean }) => Promise<void>
  total: number
  favoriteItems: FavoriteWithProduct[]
}

export const ProductContext = createContext<ProductContext | null>(null)

export const ProductProvider = ({ children, initialProducts, totalProducts }: ProductContextProviderProps) => {
  const [products, setProducts] = useState<ProductUi[]>(initialProducts)
  const [total] = useState(totalProducts)
  const [favoriteItems, setFavoriteItems] = useState<FavoriteWithProduct[]>([])

  const { dispatch } = useGlobal()

  useEffect(() => {
    loadFavoriteItems()
  }, [])

  const loadFavoriteItems = async () => {
    try {
      const favorites = await favoriteService.getFavoriteItems()
      setFavoriteItems(favorites)
    } catch (error) {
      dispatch({
        type: GlobalActions.showNotification,
        payload: {
          message:
            'Ups, tuvimos un problema al cargar los productos favoritos. Por favor, intenta nuevamente en unos minutos.',
          notificationType: 'error'
        }
      })
    }
  }

  const loadProducts = async ({ skip, take }: { skip: number; take?: number }) => {
    try {
      const newProducts = await productService.getProducts({ skip, take })
      setProducts([...products, ...newProducts])
    } catch (error) {
      dispatch({
        type: GlobalActions.showNotification,
        payload: {
          message: 'Ups, tuvimos un problema al cargar los productos. Por favor, intenta nuevamente en unos minutos.',
          notificationType: 'error'
        }
      })
    }
  }

  const markAsFavorite = async ({ productId, isFavorite }: { productId: string; isFavorite: boolean }) => {
    const prevProducts = products

    const newProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, isFavorite }
      }
      return product
    })

    if (isFavorite) {
      const productToUpdate = products.find((product) => product.id === productId)

      if (!productToUpdate) {
        dispatch({
          type: GlobalActions.showNotification,
          payload: {
            message:
              'Ups, parece ser que el producto que marcaste como favorito no existe. Por favor, intenta nuevamente en unos minutos.',
            notificationType: 'error'
          }
        })
        return
      }

      const tempId = Math.random().toString()

      setFavoriteItems([
        ...favoriteItems,
        {
          productId,
          product: productToUpdate,
          userId: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          id: tempId
        }
      ])
    } else {
      setFavoriteItems((prev) => prev.filter((favorite) => favorite.productId !== productId))
    }

    setProducts(newProducts)

    try {
      await favoriteService.toggleFavorite({ productId })
    } catch (error) {
      dispatch({
        type: GlobalActions.showNotification,
        payload: {
          message:
            'Ups, tuvimos un problema al marcar o desmarcar el producto como favorito. Por favor, intenta nuevamente en unos minutos.',
          notificationType: 'error'
        }
      })
      setProducts(prevProducts)
    }
  }

  return (
    <ProductContext.Provider value={{ products, loadProducts, markAsFavorite, total, favoriteItems }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
