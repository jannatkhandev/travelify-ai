/** @type {import('tailwindcss').Config} */
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";
  
export const darkMode = ["class"];
export const content = [
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
	extend: {
		colors: {
			"color-1": "hsl(var(--color-1))",
			"color-2": "hsl(var(--color-2))",
			"color-3": "hsl(var(--color-3))",
			"color-4": "hsl(var(--color-4))",
			"color-5": "hsl(var(--color-5))",
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
			'accordion-up': 'accordion-up 0.2s ease-out',
			rainbow: "rainbow var(--speed, 2s) infinite linear",
			ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
			"border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
			pulse: "pulse var(--duration) ease-out infinite",
		},
		keyframes: {
			pulse: {
				"0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
				"50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
			  },
			"border-beam": {
				"100%": {
				  "offset-distance": "100%",
				},
			  },
			rainbow: {
			  "0%": { "background-position": "0%" },
			  "100%": { "background-position": "200%" },
			},
			ripple: {
				"0%, 100%": {
				  transform: "translate(-50%, -50%) scale(1)",
				},
				"50%": {
				  transform: "translate(-50%, -50%) scale(0.9)",
				},
			  },
		  },
	}
};
export const plugins = [require("tailwindcss-animate"), addVariablesForColors];

function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
   
	addBase({
	  ":root": newVars,
	});
  }