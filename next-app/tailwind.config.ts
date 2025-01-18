import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			customNav: {
  				max: '950px'
  			},
  			customFooter: {
  				max: '850px'
  			}
  		},
  		colors: {
  			lightLight: 'hsl(var(--light-light))',
  			primaryRed: 'hsl(var(--primary-red))',
  			grey: 'hsl(var(--grey))',
  			starOrange: 'hsl(var(--star-orange))',
  			tertiaryLight: 'hsl(var(--tertiary-light))',
  			secondaryLight: 'hsla(var(--secondary-light))',
  			secondaryDark: 'hsl(var(--secondary-dark))',
  			primaryBorder: 'hsl(var(--primary-border))',
  			primaryLight: 'hsl(var(--primary-light))',
  			primaryGreen: 'hsl(var(--primary-green))',
  			primaryDark: 'hsl(var(--primary-dark))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		height: {
  			'46': '11.25rem'
  		},
  		fontSize: {
  			'4.5xl': '2.5rem',
  			'3.5xl': '2rem'
  		},
  		spacing: {
  			'30': '7.5rem',
  			'22': '5.5rem'
  		},
  		letterSpacing: {
  			'-1%': '-0.01em'
  		},
  		boxShadow: {
  			custom: '0px 1px 2px 0px hsla(240, 16%, 6%, 0.06)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
