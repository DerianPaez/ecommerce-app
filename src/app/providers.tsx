'use client'

import { CartProvider } from '@/context/cart-context'
import { GlobalProvider } from '@/context/global/global.context'
import { ProductProvider, ProductUi } from '@/context/products-context'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation'

export function Providers({
  children,
  products,
  totalProducts
}: {
  children: React.ReactNode
  products: ProductUi[]
  totalProducts: number
}) {
  const router = useRouter()
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <ThemeProvider attribute='class' themes={['light', 'dark']} enableSystem={true}>
          <GlobalProvider>
            <ProductProvider initialProducts={products} totalProducts={totalProducts}>
              <CartProvider>{children}</CartProvider>
            </ProductProvider>
          </GlobalProvider>
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}
