'use client'

import FavoriteItem from '@/components/favorite-item'
import { useProducts } from '@/context/products-context'
import { Card, CardBody, Divider } from '@nextui-org/react'
import { Fragment } from 'react'

export default function Favoritos() {
  const { products } = useProducts()
  const favoriteProducts = products.filter((product) => product.isFavorite)

  return (
    <div className='p-4 md:px-10 py-10'>
      <div className='grid'>
        <Card shadow='none' className='border border-divider'>
          <CardBody className='grid gap-4'>
            {favoriteProducts.map(({ id, name, image, price }, index) => (
              <Fragment key={id}>
                <FavoriteItem name={name} image={image} price={price} productId={id} />
                {index !== favoriteProducts.length - 1 && <Divider />}
              </Fragment>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
