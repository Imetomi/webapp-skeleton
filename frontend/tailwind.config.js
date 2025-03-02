/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0582ff',
          600: '#0369c1',
          700: '#0352a3',
          800: '#0c4a85',
          900: '#0c3768',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#f81ce5',
          600: '#d946ef',
          700: '#c026d3',
          800: '#a21caf',
          900: '#86198f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            maxWidth: 'none',
            lineHeight: '1.75',
            a: {
              color: theme('colors.primary.500'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.primary.600'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            table: {
              fontSize: theme('fontSize.base'),
              lineHeight: theme('lineHeight.normal'),
              width: '100%',
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            thead: {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.200'),
            },
            'thead th': {
              color: theme('colors.gray.600'),
              fontWeight: '500',
              paddingBottom: '0.857em',
              paddingTop: '0.857em',
              paddingRight: '2rem',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.100'),
              '&:last-child': {
                borderBottomWidth: '0',
              },
            },
            'tbody td': {
              paddingBottom: '0.857em',
              paddingTop: '0.857em',
              paddingRight: '2rem',
              verticalAlign: 'middle',
            },
            // Dark mode
            '.dark &': {
              color: theme('colors.gray.300'),
              'h1, h2, h3, h4': {
                color: theme('colors.white'),
              },
              a: {
                color: theme('colors.primary.400'),
                '&:hover': {
                  color: theme('colors.primary.300'),
                },
              },
              thead: {
                borderBottomColor: theme('colors.gray.800'),
              },
              'thead th': {
                color: theme('colors.gray.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.800/50'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'prose',
      target: 'modern',
    }),
  ],
}
