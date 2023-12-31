'use client'

import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ProductCardProps } from './types'

export default function ProductCard({ id, image, name, price, isFavorite }: ProductCardProps) {
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
        <figure className='grid justify-center items-center rounded-xl overflow-hidden h-72'>
          <Image src={image} width={500} height={500} alt={name} className='w-full h-full object-cover object-center' />
        </figure>
      </CardHeader>
      <CardBody className='grid gap-1 auto-rows-max'>
        <h3 className='text-left text-lg font-semibold'>{name}</h3>
        <p className='text-left text-xl font-bold'>$ {price}</p>
      </CardBody>
      <CardFooter className='pt-0 gap-2 justify-between'>
        <Button fullWidth={status !== 'authenticated'} color='primary' variant='flat'>
          Añadir al carrito
        </Button>
        {status === 'authenticated' && (
          <Button onPress={handleFavoriteClick} isIconOnly variant='light'>
            {isFavoriteProduct ? (
              <HeartSolidIcon className='text-red-500 h-6 w-6' />
            ) : (
              <HeartIcon className='text-red-500 h-6 w-6' />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
