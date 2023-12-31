import FavoriteItem from '@/components/favorite-item'
import { Card, CardBody, Divider } from '@nextui-org/react'
import { Fragment } from 'react'

export default function Favoritos() {
  const cartItems = [
    {
      id: '1',
      name: 'CLINIQUE almost lipstick lapiz labial',
      image: '/images/product-2.jpg',
      price: 499,
      isFavorite: true
    },
    {
      id: '2',
      name: 'Termo metalico 500ml Mozioni',
      image: '/images/product-3.jpg',
      price: 329,
      isFavorite: true
    },
    {
      id: '3',
      name: 'Smartwatch Huawei Watch Fit 2 Yoda-b09s Black',
      image: '/images/product-4.jpg',
      price: 1899,
      isFavorite: true
    }
  ]

  return (
    <div className='p-4 md:px-10 py-10'>
      <div className='grid'>
        <Card shadow='none' className='border border-divider'>
          <CardBody className='grid gap-4'>
            {cartItems.map(({ id, name, image, price }, index) => (
              <Fragment key={id}>
                <FavoriteItem id={id} name={name} image={image} price={price} />
                {index !== cartItems.length - 1 && <Divider />}
              </Fragment>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
