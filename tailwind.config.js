/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── shadcn tokens (keep intact for src/components/ui/*) ── */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        /* ── Brand palette — warm modern editorial ── */
        ink: '#10231C',
        forest: {
          DEFAULT: '#143D2E',
          deep: '#0A241B',
          /* `forest-dark` kept as an alias so existing classes keep working */
          dark: '#0A241B',
          light: '#2F6B4F',
        },
        fern: '#2F6B4F',
        sage: '#93A88F',
        cream: {
          DEFAULT: '#F7F2E9',
          dark: '#EFE6D6',
        },
        sand: '#EFE6D6',
        gold: {
          DEFAULT: '#D9A25F',
          light: '#EBCB9A',
        },
        terracotta: {
          DEFAULT: '#BF6647',
          deep: '#A95236',
        },
        clay: '#BF6647',
        crisis: '#B23A2E',
        charcoal: {
          DEFAULT: '#24352D',
          light: '#5A6B61',
        },
        /* legacy alias */
        hope: '#2F6B4F',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6.4vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        display: ['clamp(2.6rem, 5.2vw, 4.25rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.15rem, 4.2vw, 3.4rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.4rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'heading-lg': ['clamp(1.35rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'heading-md': ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'body-lg': ['1.09375rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.65' }],
        label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        stat: ['clamp(2.75rem, 5vw, 4.25rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        content: '1240px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        section: '7.5rem',
      },
      borderRadius: {
        sm: '10px',
        md: '14px',
        lg: '20px',
        xl: '28px',
        '2xl': '36px',
        '3xl': '44px',
        card: '24px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,35,28,0.04), 0 18px 48px -24px rgba(16,35,28,0.18)',
        lift: '0 2px 4px rgba(16,35,28,0.05), 0 26px 60px -28px rgba(16,35,28,0.26)',
        float: '0 18px 50px -18px rgba(16,35,28,0.30)',
        /* legacy aliases mapped to the new scale */
        xs: '0 1px 2px 0 rgba(16,35,28,0.05)',
        card: '0 1px 2px rgba(16,35,28,0.04), 0 18px 48px -24px rgba(16,35,28,0.18)',
        'card-hover': '0 2px 4px rgba(16,35,28,0.05), 0 26px 60px -28px rgba(16,35,28,0.26)',
        btn: '0 8px 24px -12px rgba(20,61,46,0.45)',
        'btn-gold': '0 8px 24px -12px rgba(217,162,95,0.55)',
        crisis: '0 8px 24px -12px rgba(178,58,46,0.45)',
        glass: '0 1px 2px rgba(16,35,28,0.04), 0 18px 48px -24px rgba(16,35,28,0.18)',
        'glass-hover': '0 2px 4px rgba(16,35,28,0.05), 0 26px 60px -28px rgba(16,35,28,0.26)',
        glow: '0 0 60px rgba(217,162,95,0.18)',
        'glow-forest': '0 0 60px rgba(20,61,46,0.18)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.35" },
          "100%": { transform: "scale(1.75)", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "float": "float 7s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2.4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3.2s ease-in-out infinite",
        "shimmer": "shimmer 2.2s linear infinite",
        "fade-in-up": "fade-in-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-scale": "fade-in-scale 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-in-left": "slide-in-left 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-in-right": "slide-in-right 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
