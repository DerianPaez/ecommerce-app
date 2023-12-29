import CartItem from '@/components/cart-item'
import CartSummary from '@/components/cart-summary'
import { Card, CardBody, Divider } from '@nextui-org/react'
import { Fragment } from 'react'

const cartItems = [
  {
    id: '1',
    name: 'Procesador AMD Ryzen 5 5600X',
    price: 299.99,
    image: '/productId.jpg'
  },
  {
    id: '2',
    name: 'Tarjeta Gráfica NVIDIA RTX 3070',
    price: 499.99,
    image: '/productId.jpg'
  }
]

export default function Cart() {
  return (
    <div className='p-4 md:px-10 py-10'>
      <div className='grid gap-10 md:grid-cols-cart'>
        <Card shadow='none' className='border border-divider'>
          <CardBody className='grid gap-4'>
            {cartItems.map(({ id, name, image, price }, index) => (
              <Fragment key={id}>
                <CartItem id={id} name={name} image={image} price={price} />
                {index !== cartItems.length - 1 && <Divider />}
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
