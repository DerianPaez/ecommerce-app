import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'product-auto-fit': 'repeat(auto-fit, minmax(280px, 1fr))',
        'cart-item': 'max-content 1fr',
        cart: '3fr max-content'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      height: {
        'screen-minus-footer': 'calc(100vh - 68.2px)'
      },
      gridTemplateRows: {
        layout: 'max-content 1fr max-content'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: 'red'
            }
          }
        },
        light: {
          colors: {
            primary: {
              DEFAULT: 'red'
            }
          }
        }
      }
    })
  ]
}
export default config
