'use client'

import { Product } from '@prisma/client'
import { createContext, useContext, useState } from 'react'

type ProductContextProviderProps = {
  children: React.ReactNode
}

type ProductUi = Product & { isFavorite?: boolean }

type ProductContext = {
  products: ProductUi[]
  loadProducts: () => Promise<void>
}

export const ProductContext = createContext<ProductContext | null>(null)

export const ProductProvider = ({ children }: ProductContextProviderProps) => {
  const [products, setProducts] = useState<ProductUi[]>([])
  const productsToShow = 10

  const loadProducts = async () => {
    const response = await fetch(`/api/products?productsLength=${products.length}&productsToShow=${productsToShow}`)
    const newProducts = await response.json()
    setProducts([...products, ...newProducts])
  }

  return <ProductContext.Provider value={{ products, loadProducts }}>{children}</ProductContext.Provider>
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
