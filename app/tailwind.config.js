/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
        /* 产业链自定义层级色 */
        tier: {
          upstream: "var(--tier-upstream)",
          "upstream-dim": "var(--tier-upstream-dim)",
          midstream: "var(--tier-midstream)",
          "midstream-dim": "var(--tier-midstream-dim)",
          downstream: "var(--tier-downstream)",
          "downstream-dim": "var(--tier-downstream-dim)",
          general: "var(--tier-general)",
          "general-dim": "var(--tier-general-dim)",
        },
        /* 背景层级 */
        canvas: {
          base: "var(--bg-base)",
          elevated: "var(--bg-elevated)",
          surface: "var(--bg-surface)",
          overlay: "var(--bg-overlay)",
          hover: "var(--bg-hover)",
        },
        /* 前景层级 */
        fg: {
          primary: "var(--fg-primary)",
          secondary: "var(--fg-secondary)",
          tertiary: "var(--fg-tertiary)",
          disabled: "var(--fg-disabled)",
          accent: "var(--fg-accent)",
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-lg': ['18px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['15px', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['13px', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['11px', { lineHeight: '1.4', fontWeight: '400' }],
        'numeric': ['12px', { lineHeight: '1', fontWeight: '500' }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'canvas-sm': 'var(--shadow-sm)',
        'canvas-md': 'var(--shadow-md)',
        'canvas-lg': 'var(--shadow-lg)',
        'canvas-xl': 'var(--shadow-xl)',
        'glow-selected': 'var(--glow-selected)',
        'glow-upstream': 'var(--glow-upstream)',
        'glow-midstream': 'var(--glow-midstream)',
        'glow-downstream': 'var(--glow-downstream)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
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
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "node-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(56, 189, 248, 0.3)" },
          "50%": { boxShadow: "0 0 0 8px rgba(56, 189, 248, 0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.2s ease-out",
        "node-pulse": "node-pulse 1.5s ease-in-out infinite",
        "shimmer": "shimmer 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
