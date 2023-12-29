export type CounterProps = {
  className?: string
  value: number
  max?: number
  min?: number
  disabled?: boolean
  onCountChange?: (value: number) => void
}
