'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import Sidebar from '../sidebar'

export default function Navigation() {
  const categories = [
    {
      id: '1',
      label: 'Ropa de mujer',
      href: 'ropa-mujer'
    },
    {
      id: '2',
      label: 'Ropa de hombre',
      href: 'ropa-hombre'
    },
    {
      id: '3',
      label: 'Ropa infantil',
      href: 'ropa-infantil'
    },
    {
      id: '4',
      label: 'Calzado de mujer',
      href: 'calzado-mujer'
    },
    {
      id: '5',
      label: 'Calzado de hombre',
      href: 'calzado-hombre'
    },
    {
      id: '6',
      label: 'Calzado infantil',
      href: 'calzado-infantil'
    },
    {
      id: '7',
      label: 'Electrónica de consumo',
      href: 'electronica-consumo'
    },
    {
      id: '8',
      label: 'Electrónica para el hogar',
      href: 'electronica-hogar'
    },
    {
      id: '9',
      label: 'Electrónica para el trabajo',
      href: 'electronica-trabajo'
    },
    {
      id: '10',
      label: 'Hogar y jardín',
      href: 'hogar-jardin'
    },
    {
      id: '11',
      label: 'Cocina y menaje',
      href: 'cocina-menaje'
    },
    {
      id: '12',
      label: 'Decoración',
      href: 'decoracion'
    },
    {
      id: '13',
      label: 'Belleza y cuidado personal',
      href: 'belleza-cuidado-personal'
    },
    {
      id: '14',
      label: 'Maquillaje',
      href: 'maquillaje'
    },
    {
      id: '15',
      label: 'Cuidado de la piel',
      href: 'cuidado-piel'
    },
    {
      id: '16',
      label: 'Cuidado del cabello',
      href: 'cuidado-cabello'
    }
  ]

  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  return (
    <>
      <header className='fixed w-full border-b-1 border-gray-900 p-4 lg:px-10'>
        <div className='grid grid-flow-col items-center justify-between gap-4'>
          <div className='grid grid-flow-col items-center gap-2'>
            <Button onClick={toggleSidebar} isIconOnly variant='light'>
              H
            </Button>
            <Link href='/'>Ecommerce</Link>
          </div>

          <Button onClick={() => alert('Signup')} color='primary' href='#' variant='flat'>
            Registrate
          </Button>
        </div>
      </header>

      <Sidebar categories={categories} isOpen={isOpen} />
    </>
  )
}
