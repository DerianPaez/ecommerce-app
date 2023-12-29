import ProductCard from '@/components/product-card'

export default function Home() {
  const products = [
    {
      id: '1',
      name: 'Apple Watch Series 8',
      image: '/images/product-1.jpg',
      price: 1099
    },
    {
      id: '2',
      name: 'CLINIQUE almost lipstick lapiz labial',
      image: '/images/product-2.jpg',
      price: 499
    },
    {
      id: '3',
      name: 'Termo metalico 500ml Mozioni',
      image: '/images/product-3.jpg',
      price: 329
    },
    {
      id: '4',
      name: 'Smartwatch Huawei Watch Fit 2 Yoda-b09s Black',
      image: '/images/product-4.jpg',
      price: 1899
    }
  ]

  return (
    <div className='p-4 md:px-10 py-10'>
      <div className='grid grid-cols-product-auto-fit gap-4'>
        {products.map(({ id, name, image, price }) => (
          <ProductCard key={id} id={id} name={name} image={image} price={price} />
        ))}
      </div>
    </div>
  )
}
