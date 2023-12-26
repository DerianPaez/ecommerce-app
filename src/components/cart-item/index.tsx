'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import { useState } from 'react'
import Counter from '../counter'
import { CartItemProps } from './types'

export default function CartItem({ id, name, price, image }: CartItemProps) {
  const [count, setCount] = useState(1)

  return (
    <Card id={id} shadow='none' as='article' className='grid grid-cols-cart-item items-center'>
      <CardHeader>
        <figure className='w-28 h-28 grid justify-center items-center rounded-xl border border-divider overflow-hidden'>
          <Image
            src={image}
            width={200}
            height={120}
            alt='Intel Core i9 (12th Gen)'
            className='h-full w-full object-cover object-center'
          />
        </figure>
      </CardHeader>

      <CardBody className='w-full grid gap-4 grid-flow-row auto-rows-max'>
        <div>
          <div className='lg:grid lg:grid-flow-col lg:auto-cols-max lg:justify-between'>
            <h3 className='text-lg font-semibold'>{name}</h3>
            <span className='text-xl font-semibold'>$ {Number((price * count).toFixed(2))}</span>
          </div>
          <span>$ {price}</span>
        </div>

        <div className='grid gap-4 lg:grid-flow-col lg:auto-cols-max lg:justify-between'>
          <Counter value={count} onCountChange={(value) => setCount(value)} min={1} />
          <Button className='w-max' color='danger' variant='flat' startContent={<TrashIcon className='h-5 w-5' />}>
            Eliminar
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
