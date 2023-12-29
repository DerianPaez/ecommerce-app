'use client'

import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ProductCardProps } from './types'

export default function ProductCard({ products }: ProductCardProps) {
  const router = useRouter()

  return (
    <div className='grid grid-cols-product-auto-fit gap-4'>
      {products.map(({ id, name, image, price }) => (
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
              <Image
                src={image}
                width={500}
                height={500}
                alt={name}
                className='w-full h-full object-cover object-center'
              />
            </figure>
          </CardHeader>
          <CardBody className='grid gap-1 auto-rows-max'>
            <h3 className='text-left text-lg font-semibold'>{name}</h3>
            <p className='text-left text-xl font-bold'>$ {price}</p>
          </CardBody>
          <CardFooter className='pt-0'>
            <Button className='w-full' color='primary' variant='flat'>
              Añadir al carrito
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
