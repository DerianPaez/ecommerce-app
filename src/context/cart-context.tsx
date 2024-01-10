'use client'

import { CartItem } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'

type CartContextProviderProps = {
  children: React.ReactNode
}

type CartContext = {
  cart: CartItem[]
  addToCart: (productId: string) => Promise<void>
  loadCart: () => Promise<void>
  removeFromCart: (cartId: string) => Promise<void>
}

export const CartContext = createContext<CartContext | null>(null)

export const CartProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      loadCart()
    }
  }, [status])

  const loadCart = async () => {
    const response = await fetch(`/api/cart`)
    const cart = await response.json()
    setCart(cart)
  }

  const addToCart = async (productId: string) => {
    const response = await fetch(`/api/cart?productId=${productId}`, { method: 'POST' })

    const existingCartItem = cart.find((cartItem) => cartItem?.productId === productId)

    if (existingCartItem) {
      existingCartItem.quantity += 1
      const updatedCart = cart.filter((cartItem) => cartItem?.productId !== productId)
      console.log({ updatedCart, existingCartItem })
      setCart([...updatedCart, existingCartItem])
      return
    }

    const { newCartItem } = await response.json()

    setCart([...cart, newCartItem])
  }

  const removeFromCart = async (cartId: string) => {
    await fetch(`/api/cart?cartId=${cartId}`, { method: 'DELETE' })
    const updatedCart = cart.filter((cartItem) => cartItem.id !== cartId)
    setCart(updatedCart)
  }
  return <CartContext.Provider value={{ cart, addToCart, loadCart, removeFromCart }}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a ProductsProvider')
  }
  return context
}
