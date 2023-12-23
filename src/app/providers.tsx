'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <ThemeProvider attribute='class' themes={['light', 'dark']} enableSystem={true}>
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}
