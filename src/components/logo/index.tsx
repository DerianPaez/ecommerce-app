import Link from 'next/link'

export default function Logo() {
  return (
    <Link href='/'>
      <span className='block md:hidden'>Eco</span>
      <span className='hidden md:block'>Ecommerce</span>
    </Link>
  )
}
