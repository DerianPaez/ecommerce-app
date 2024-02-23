'use client'

import { useCart } from '@/context/cart-context'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import { AddToCartProps } from './types'

export default function AddToCart({ productId, fullWidth, className }: AddToCartProps) {
  const { addToCart } = useCart()

  return (
    <Button
      className={className}
      onPress={() => {
        addToCart(productId)
      }}
      fullWidth={fullWidth}
      color='primary'
      variant='flat'
      startContent={<ShoppingCartIcon className='h-5 w-5' />}
    >
      Añadir al carrito
    </Button>
  )
}
