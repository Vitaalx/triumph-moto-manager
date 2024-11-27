import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    safelist: ["dark"],
    prefix: "",

    safelist: [
        // Ensure these classes are always included in the final CSS bundle
        'h-1/2', 'h-1/3', 'h-2/3', 'h-1/4', 'h-3/4', 'h-1/5', 'h-2/5', 'h-3/5', 'h-4/5',
        'w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4', 'w-1/5', 'w-2/5', 'w-3/5', 'w-4/5',
        'flex', 'flex-row', 'flex-col', 'flex-row-reverse', 'flex-col-reverse',
    ],

    content: [
        './pages/**/*.{ts,tsx,vue}',
        './components/**/*.{ts,tsx,vue}',
        './app/**/*.{ts,tsx,vue}',
        './src/**/*.{ts,tsx,vue}',
	],

    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            width: {
                "112": "28rem", // 448px
                "134": "33rem", // 528px
                "136": "34rem", // 544px
                "224": "56rem", // 896px
                "320": "80rem", // 1280px
            },
            maxWidth: {
                "112": "28rem", // 448px
                "134": "33rem", // 528px
                "136": "34rem", // 544px
                "224": "56rem", // 896px
                "320": "80rem", // 1280px
            },
            height: {
                "112": "28rem", // 448px
                "134": "33rem", // 528px
                "136": "34rem", // 544px
                "224": "56rem", // 896px
                "320": "80rem", // 1280px
                "screen-nh": "calc(100vh - 7rem)", // screen - header
            },
            minHeight: {
                "112": "28rem", // 448px
                "134": "33rem", // 528px
                "136": "34rem", // 544px
                "224": "56rem", // 896px
                "320": "80rem", // 1280px
                "screen-nh": "calc(100vh - 7rem)", // screen - header
            },
            maxHeight: {
                "112": "28rem", // 448px
                "134": "33rem", // 528px
                "136": "34rem", // 544px
                "224": "56rem", // 896px
                "320": "80rem", // 1280px
                "screen-nh": "calc(100vh - 7rem)", // screen - header
            },
            colors: {
                carbon: "#141414",
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
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
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
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                "collapsible-down": {
                    from: { height: 0 },
                    to: { height: 'var(--radix-collapsible-content-height)' },
                },
                "collapsible-up": {
                    from: { height: 'var(--radix-collapsible-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "collapsible-down": "collapsible-down 0.2s ease-in-out",
                "collapsible-up": "collapsible-up 0.2s ease-in-out",
            },
        },
    },
    plugins: [animate],
}
