'use client'

import { CartItem, Product } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useProducts } from './products-context'

type CartContextProviderProps = {
  children: React.ReactNode
}

type CartItemUi = CartItem & {
  product: Product
}

type CartContext = {
  cart: CartItemUi[]
  addToCart: (productId: string) => Promise<void>
  loadCart: () => Promise<void>
  removeFromCart: (cartId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
}

export const CartContext = createContext<CartContext | null>(null)

export const CartProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState<CartItemUi[]>([])
  const { status } = useSession()
  const { products } = useProducts()

  useEffect(() => {
    loadCart()
  }, [status])

  const loadCart = async () => {
    const localStorageCart: CartItemUi[] = JSON.parse(localStorage.getItem('cart') || '[]')

    if (status === 'unauthenticated') {
      setCart(localStorageCart)
      return
    }

    if (status === 'authenticated') {
      try {
        const response = await fetch(`/api/cart`)
        const serverCart: CartItemUi[] = await response.json()

        if (localStorageCart === null || localStorageCart.length === 0) {
          setCart(serverCart)
          return
        }

        await syncCart(localStorageCart, serverCart)
      } catch (error) {
        console.error('Error al cargar el carrito', error)
      }
    }
  }

  const syncCart = async (localStorageCart: CartItemUi[], serverCart: CartItemUi[]) => {
    const combinedCartMap = new Map()

    serverCart.forEach((item) => {
      combinedCartMap.set(item.productId, item)
    })

    localStorageCart.forEach((localItem) => {
      const existingItem = combinedCartMap.get(localItem.productId)
      if (existingItem) {
        combinedCartMap.set(localItem.productId, {
          ...existingItem,
          quantity: existingItem.quantity + localItem.quantity
        })
      } else {
        combinedCartMap.set(localItem.productId, localItem)
      }
    })

    const combinedCart = Array.from(combinedCartMap.values())

    setCart(combinedCart)

    try {
      await fetch(`/api/cart`, { method: 'PUT', body: JSON.stringify(combinedCart) })
      localStorage.removeItem('cart')
    } catch (error) {
      console.error('Error al sincronizar el carrito', error)
      setCart((cart) =>
        cart.filter((item) => !localStorageCart.some((localItem) => localItem.productId === item.productId))
      )
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    const prevCart = cart
    const existingCartItem = cart.find((cartItem) => cartItem?.productId === productId)

    if (!existingCartItem) {
      return
    }

    const updatedCart = cart.map((cartItem) => {
      if (cartItem.productId === productId) {
        return { ...cartItem, quantity }
      }
      return cartItem
    })

    setCart(updatedCart)

    if (status !== 'authenticated') {
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return
    }

    try {
      await fetch(`/api/cart?productId=${productId}&quantity=${quantity}`, {
        method: 'PATCH',
        body: JSON.stringify({ updatedCart })
      })
    } catch (error) {
      console.error('Error al actualizar la cantidad del carrito', error)
      setCart(prevCart)
    }
  }

  const addToCart = async (productId: string) => {
    const prevCart = cart

    const existingCartItem = cart.find((cartItem) => cartItem?.productId === productId)

    if (existingCartItem) {
      existingCartItem.quantity += 1
      const updatedCart = cart.filter((cartItem) => cartItem?.productId !== productId)
      setCart([...updatedCart, existingCartItem])

      if (status !== 'authenticated') {
        localStorage.setItem('cart', JSON.stringify(cart))
        return
      }

      try {
        await fetch(`/api/cart?productId=${productId}`, { method: 'POST' })
      } catch (error) {
        console.error('Error al agregar al carrito', error)
        setCart(prevCart)
      }
      return
    }

    const product = products.find((product) => product.id === productId)

    if (!product) {
      return
    }

    const tempId = Math.random().toString()

    const newCartItem: CartItemUi = {
      productId,
      quantity: 1,
      product,
      id: tempId,
      userId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const newCart = [...cart, newCartItem]
    setCart(newCart)

    try {
      if (status === 'authenticated') {
        const response = await fetch(`/api/cart?productId=${productId}`, { method: 'POST' })

        if (!response.ok) {
          throw new Error('Error al agregar al carrito')
        }

        const { newCartItem } = await response.json()
        setCart((cart) => cart.map((item) => (item.id === tempId ? { ...item, ...newCartItem } : item)))
        return
      }

      localStorage.setItem('cart', JSON.stringify(newCart))
    } catch (error) {
      setCart(prevCart)
      console.error('Error al agregar al carrito', error)
    }
  }

  const removeFromCart = async (productId: string) => {
    const prevCart = cart

    const updatedCart = cart.filter((cartItem) => cartItem.productId !== productId)
    setCart(updatedCart)

    if (status !== 'authenticated') {
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return
    }

    try {
      await fetch(`/api/cart?productId=${productId}`, { method: 'DELETE' })
    } catch (error) {
      console.error('Error al eliminar del carrito', error)
      setCart(prevCart)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, loadCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a ProductsProvider')
  }
  return context
}
