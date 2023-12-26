'use client'

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { CounterProps } from './type'

export default function Counter({ className, min = 0, max = Infinity, onCountChange, value, disabled }: CounterProps) {
  const [count, setCount] = useState(value)

  useEffect(() => {
    if (onCountChange) onCountChange(count)
  }, [count])

  useEffect(() => {
    setCount(value || 0)
  }, [value])

  const handleIncrement = () => setCount((prev) => Math.min(prev + 1, max))
  const handleDecrement = () => setCount((prev) => Math.max(prev - 1, min))

  return (
    <div className={`${className} grid grid-flow-col auto-cols-max items-center gap-2`}>
      <Button isIconOnly variant='flat' onPress={handleDecrement} disabled={count <= min || disabled}>
        <MinusIcon className='h-4 w-4' />
      </Button>
      <Input
        size='sm'
        value={count.toString() ?? 0}
        type='number'
        variant='faded'
        onValueChange={(value) => setCount(parseInt(value))}
        classNames={{ inputWrapper: 'h-10 w-12 md:w-20', input: 'text-center' }}
      />
      <Button isIconOnly variant='flat' onPress={handleIncrement} disabled={count >= max || disabled}>
        <PlusIcon className='h-4 w-4' />
      </Button>
    </div>
  )
}
