import prisma from '@/app/lib/prisma'
import AddToCart from '@/components/add-to-cart'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getProductsById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    return product
  } catch (error) {
    return undefined
  }
}

export default async function ProductDetails({ params }: { params: { productId: string } }) {
  const { productId } = params
  const product = await getProductsById(productId)

  if (!product) {
    notFound()
  }

  return (
    <div className='p-4 md:px-10 py-10 h-full grid items-center'>
      <div className='grid gap-8 md:grid-cols-2 auto-rows-max md:auto-rows-auto items-center h-full'>
        <figure className='flex justify-center items-center rounded-xl overflow-hidden'>
          <Image
            src={product.image}
            width={500}
            height={500}
            className='object-cover w-full h-full'
            alt={product.name}
          />
        </figure>

        <div className='grid gap-4 grid-flow-row auto-rows-max'>
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <p>{product.description}</p>
          <span className='text-xl font-bold'>${product.price}</span>
          <AddToCart productId={productId} className='w-max' />
        </div>
      </div>
    </div>
  )
}
