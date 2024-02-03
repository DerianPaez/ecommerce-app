'use client'

import { useProducts } from '@/context/products-context'
import ProductCard from '../product-card'

export function ProductList() {
  const { isLoading, products } = useProducts()

  return (
    <div className='grid grid-cols-product-auto-fill gap-4'>
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <ProductCard key={index} isLoading id='' image='' name='' price={0} />
          ))
        : products.map(({ id, name, imageUrls, price, isFavorite }) => (
            <ProductCard key={id} id={id} name={name} image={imageUrls[0]} price={price} isFavorite={isFavorite} />
          ))}
    </div>
  )
}
