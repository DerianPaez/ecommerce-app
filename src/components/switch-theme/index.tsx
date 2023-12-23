'use client'

import { BoltIcon, MoonIcon } from '@heroicons/react/20/solid'
import { Switch } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme, theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (theme) setTheme(theme)
  }, [resolvedTheme])

  if (!mounted) return null

  return (
    <Switch
      isSelected={resolvedTheme === 'dark'}
      size='lg'
      color='primary'
      onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
      thumbIcon={({ isSelected, className }) => {
        const classNames = `${className} h-4 h-4 text-gray-600`
        return isSelected ? <BoltIcon className={classNames} /> : <MoonIcon className={classNames} />
      }}
    />
  )
}
