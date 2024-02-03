'use client'

import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Skeleton } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ProductCardProps } from './types'

export default function ProductCard({ id, image, name, price, isFavorite, isLoading }: ProductCardProps) {
  const router = useRouter()
  const { status } = useSession()
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(isFavorite)

  const handleFavoriteClick = () => {
    const previousFavoriteStatus = isFavoriteProduct
    const newFavoriteStatus = !isFavoriteProduct
    setIsFavoriteProduct(newFavoriteStatus)
  }

  return (
    <Card
      key={id}
      isPressable
      onPress={() => {
        router.push(id)
      }}
      className='w-full border border-divider dark:border-none rounded-xl py-2'
      as='article'
      shadow='none'
    >
      <CardHeader>
        <figure className='w-full grid justify-center items-center rounded-xl overflow-hidden h-72 relative'>
          <Image
            fill
            src={image}
            as={NextImage}
            alt={name}
            isLoading={isLoading}
            classNames={{
              wrapper: 'h-full w-full static',
              img: 'object-cover w-full h-full'
            }}
          />
        </figure>
      </CardHeader>
      <CardBody className='grid gap-1 auto-rows-max'>
        <Skeleton className='min-h-7 rounded-lg' isLoaded={!isLoading}>
          <h3 className='w-full text-left text-lg font-semibold'>{name}</h3>
        </Skeleton>
        <Skeleton className='w-32 min-h-7 rounded-lg' isLoaded={!isLoading}>
          <p className='w-full text-left text-xl font-bold'>$ {price}</p>
        </Skeleton>
      </CardBody>
      <CardFooter className='pt-0 gap-2 justify-between'>
        <Skeleton className='w-max rounded-lg' isLoaded={!isLoading}>
          <Button
            fullWidth={status !== 'authenticated'}
            color='primary'
            variant='flat'
            startContent={<ShoppingCartIcon className='h-5 w-5' />}
          >
            Añadir al carrito
          </Button>
        </Skeleton>
        {status === 'authenticated' && (
          <Skeleton className='w-max h-max rounded-lg' isLoaded={!isLoading}>
            <Button onPress={handleFavoriteClick} isIconOnly variant='light'>
              {isFavoriteProduct ? (
                <HeartSolidIcon className='text-red-500 h-6 w-6' />
              ) : (
                <HeartIcon className='text-red-500 h-6 w-6' />
              )}
            </Button>
          </Skeleton>
        )}
      </CardFooter>
    </Card>
  )
}
