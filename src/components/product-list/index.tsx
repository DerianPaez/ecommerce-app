'use client'

import { useProducts } from '@/context/products-context'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import ProductCard from '../product-card'

export function ProductList() {
  const { loadProducts, products, total } = useProducts()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <section className='flex flex-col gap-8 justify-cente'>
      <div className='grid grid-cols-product-auto-fill gap-4'>
        {products.map(({ id, name, image, price, isFavorite }) => (
          <ProductCard key={id} id={id} name={name} image={image} price={price} isFavorite={isFavorite} />
        ))}
      </div>

      <Button
        className='w-max self-center'
        onPress={async () => {
          setIsLoading(true)
          await loadProducts({ skip: products.length })
          setIsLoading(false)
        }}
        color='primary'
        variant='flat'
        size='lg'
        isDisabled={products.length >= total}
        isLoading={isLoading}
      >
        Cargar más
      </Button>
    </section>
  )
}
