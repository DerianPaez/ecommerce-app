import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

export default function ProductDetails() {
  return (
    <div className='p-4 md:px-10 py-10 h-full grid items-center'>
      <div className='grid gap-8 md:grid-cols-2 auto-rows-max md:auto-rows-auto items-center h-full'>
        <figure className='flex justify-center items-center rounded-xl overflow-hidden'>
          <Image
            src='/productId.jpg'
            width={500}
            height={500}
            className='object-cover w-full h-full'
            alt='Intel Core i9 (12th Gen)'
          />
        </figure>

        <div className='grid gap-4 grid-flow-row auto-rows-max'>
          <h1 className='text-2xl font-bold'>Intel Core i9 (12th Gen)</h1>
          <p>
            Core i9 12th Gen Alder Lake 16-Core (8P+8E) 3.2 GHz LGA 1700 125W Intel UHD Graphics 770 Desktop Processor -
            BX8071512900K
          </p>
          <span className='text-xl font-bold'>$360.00</span>
          <Button
            className='w-max'
            color='primary'
            variant='flat'
            startContent={<ShoppingCartIcon className='h-5 w-5' />}
          >
            Añadir al carrito
          </Button>
        </div>
      </div>
    </div>
  )
}
