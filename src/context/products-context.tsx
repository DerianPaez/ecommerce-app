'use client'

import { Favorite, Product } from '@prisma/client'
import { createContext, useContext, useEffect, useState } from 'react'

type ProductContextProviderProps = {
  children: React.ReactNode
}

type ProductUi = Product & { isFavorite?: boolean }

type FavoriteItemUi = Favorite & {
  product: Product
}

type ProductContext = {
  products: ProductUi[]
  loadProducts: () => Promise<void>
  markAsFavorite: (productId: string, isFavorite: boolean) => void
}

export const ProductContext = createContext<ProductContext | null>(null)

export const ProductProvider = ({ children }: ProductContextProviderProps) => {
  const [products, setProducts] = useState<ProductUi[]>([])
  const productsToShow = 10

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const response = await fetch(`/api/products?productsLength=${products.length}&productsToShow=${productsToShow}`)
    const newProducts = await response.json()
    setProducts([...products, ...newProducts])
  }

  const markAsFavorite = (productId: string, isFavorite: boolean) => {
    const prevProducts = products
    const newProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, isFavorite }
      }
      return product
    })
    setProducts(newProducts)

    isFavorite ? addToFavorite(productId, prevProducts) : removeFromFavorite(productId, prevProducts)
  }

  const addToFavorite = async (productId: string, prevProducts: ProductUi[]) => {
    const product = products.find((product) => product.id === productId)

    if (!product) {
      return
    }

    try {
      const response = await fetch(`/api/favorite?productId=${productId}`, { method: 'POST' })

      if (!response.ok) {
        throw new Error('Error al agregar a favoritos')
      }

      await response.json()
    } catch (error) {
      console.error('Error al agregar a favoritos', error)
      setProducts(prevProducts)
    }
  }

  const removeFromFavorite = (productId: string, prevProducts: ProductUi[]) => {
    const product = products.find((product) => product.id === productId)

    if (!product) {
      return
    }

    try {
      fetch(`/api/favorite?productId=${productId}`, { method: 'DELETE' })
    } catch (error) {
      console.error('Error al eliminar de favoritos', error)
      setProducts(prevProducts)
    }
  }

  return (
    <ProductContext.Provider value={{ products, loadProducts, markAsFavorite }}>{children}</ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
