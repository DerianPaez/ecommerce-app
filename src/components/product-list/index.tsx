'use client'

import { useProducts } from '@/context/products-context'
import ProductCard from '../product-card'

export function ProductList() {
  const { products } = useProducts()

  return (
    <div className='grid grid-cols-product-auto-fill gap-4'>
      {products.map(({ id, name, image, price, isFavorite }) => (
        <ProductCard key={id} id={id} name={name} image={image} price={price} isFavorite={isFavorite} />
      ))}
    </div>
  )
}
