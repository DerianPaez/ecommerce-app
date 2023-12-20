'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Navigation() {
  return (
    <header className='fixed w-full border-b-1 border-gray-900 p-4'>
      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <div className='grid grid-flow-col items-center gap-2'>
          <Button onClick={() => alert('Open sidebar')} isIconOnly variant='light'>
            H
          </Button>
          <Link href='/'>Ecommerce</Link>
        </div>

        <Button onClick={() => alert('Signup')} color='primary' href='#' variant='flat'>
          Registrate
        </Button>
      </div>
    </header>
  )
}
