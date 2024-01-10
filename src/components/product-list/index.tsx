'use client'

import { useProducts } from '@/context/products-context'
import { useEffect } from 'react'
import ProductCard from '../product-card'

export function ProductList() {
  const { products, loadProducts } = useProducts()
  useEffect(() => {
    loadProducts()
  }, [])
  return (
    <div className='grid grid-cols-product-auto-fit gap-4'>
      {products.map(({ id, name, imageUrls, price, isFavorite }) => (
        <ProductCard key={id} id={id} name={name} image={imageUrls[0]} price={price} isFavorite={isFavorite} />
      ))}
    </div>
  )
}
