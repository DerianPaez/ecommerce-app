'use client'

import CartItem from '@/components/cart-item'
import CartSummary from '@/components/cart-summary'
import { useCart } from '@/context/cart-context'
import { Card, CardBody, Divider } from '@nextui-org/react'
import { Fragment } from 'react'

export default function Cart() {
  const { cart } = useCart()
  return (
    <div className='p-4 md:px-10 py-10'>
      <div className='grid gap-10 md:grid-cols-cart'>
        <Card shadow='none' className='border border-divider h-max'>
          <CardBody className='grid gap-4'>
            {cart.map(({ id, product: { name, imageUrls, price }, productId, quantity }, index) => (
              <Fragment key={id}>
                <CartItem
                  id={id}
                  name={name}
                  image={imageUrls[0]}
                  price={price}
                  productId={productId}
                  quantity={quantity}
                />
                {index !== cart.length - 1 && <Divider />}
              </Fragment>
            ))}
          </CardBody>
        </Card>

        <CartSummary
          className='w-full md:w-[240px] lg:w-[320px] h-max'
          subtotal={1179.95}
          shipping={50.0}
          total={1229.95}
        />
      </div>
    </div>
  )
}
