'use client'

import { Product } from '@prisma/client'
import { createContext, useContext, useEffect, useState } from 'react'

type ProductContextProviderProps = {
  children: React.ReactNode
}

export type ProductUi = Product & { isFavorite?: boolean }

type ProductContext = {
  isLoading: boolean
  products: ProductUi[]
  loadProducts: () => Promise<void>
}

export const ProductContext = createContext<ProductContext | null>(null)

export const ProductProvider = ({ children }: ProductContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductUi[]>([])
  const productsToShow = 10

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/products?productsLength=${products.length}&productsToShow=${productsToShow}`)
      const newProducts = await response.json()
      setProducts([...products, ...newProducts])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return <ProductContext.Provider value={{ isLoading, products, loadProducts }}>{children}</ProductContext.Provider>
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
