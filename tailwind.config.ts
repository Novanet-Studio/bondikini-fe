import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  theme: {
    extend: {
      colors: {
        // color-1 always be the custom-primary color
        'custom-primary': {
          DEFAULT: '#DDABAC',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#F5E5E5',
          400: '#E9C8C9',
          500: '#DDABAC',
          600: '#CD8385',
          700: '#BD5B5D',
          800: '#9F4042',
          900: '#773032',
          950: '#632829'
        },
        // color-5
        'custom-gray': {
          DEFAULT: '#5A5A5A',
          50: '#B6B6B6',
          100: '#ACACAC',
          200: '#979797',
          300: '#838383',
          400: '#6E6E6E',
          500: '#5A5A5A',
          600: '#3E3E3E',
          700: '#222222',
          800: '#060606',
          900: '#000000',
          950: '#000000'
        },
        'color-2': {
          DEFAULT: '#FAE1CD',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FEF7F2',
          500: '#FAE1CD',
          600: '#F5C29A',
          700: '#F0A467',
          800: '#EB8534',
          900: '#D26915',
          950: '#B85C12'
        },
        'color-3': {
          DEFAULT: '#672F2E',
          50: '#C88684',
          100: '#C27876',
          200: '#B55C5A',
          300: '#9F4947',
          400: '#833C3B',
          500: '#672F2E',
          600: '#401D1D',
          700: '#190C0B',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
        'color-4': {
          DEFAULT: '#ECECEC',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#ECECEC',
          600: '#D0D0D0',
          700: '#B4B4B4',
          800: '#989898',
          900: '#7C7C7C',
          950: '#6E6E6E'
        },
        'color-6': {
          DEFAULT: '#2F2F2F',
          50: '#8B8B8B',
          100: '#818181',
          200: '#6C6C6C',
          300: '#585858',
          400: '#434343',
          500: '#2F2F2F',
          600: '#131313',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
        'color-7': {
          DEFAULT: '#FEFFF9',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#FEFFF9',
          600: '#F5FFC1',
          700: '#EBFF89',
          800: '#E2FF51',
          900: '#D9FF19',
          950: '#D2FC00'
        }
      },
      fontFamily: {
        sans: ['Lora', 'sans-serif'],
      }
    }
  }
}
