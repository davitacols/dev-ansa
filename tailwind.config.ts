/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
      fontFamily: {
        serif: ["Source Serif Pro", "Georgia", "Times New Roman", "serif"],
      },
      colors: {
        medium: {
          text: "var(--medium-text)",
          "text-light": "var(--medium-text-light)",
          accent: "var(--medium-accent)",
          "accent-light": "var(--medium-accent-light)",
          bg: "var(--medium-bg)",
          "bg-light": "var(--medium-bg-light)",
        },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.medium.text"),
            "--tw-prose-headings": theme("colors.medium.text"),
            "--tw-prose-lead": theme("colors.medium.text-light"),
            "--tw-prose-links": theme("colors.medium.accent"),
            "--tw-prose-bold": theme("colors.medium.text"),
            "--tw-prose-counters": theme("colors.medium.text-light"),
            "--tw-prose-bullets": theme("colors.medium.text-light"),
            "--tw-prose-hr": theme("colors.medium.accent-light"),
            "--tw-prose-quotes": theme("colors.medium.text"),
            "--tw-prose-quote-borders": theme("colors.medium.accent"),
            "--tw-prose-captions": theme("colors.medium.text-light"),
            "--tw-prose-code": theme("colors.medium.text"),
            "--tw-prose-pre-code": theme("colors.medium.bg"),
            "--tw-prose-pre-bg": theme("colors.medium.text"),
            "--tw-prose-th-borders": theme("colors.medium.accent-light"),
            "--tw-prose-td-borders": theme("colors.medium.accent-light"),

            // Base
            color: "var(--tw-prose-body)",
            fontSize: "1.125rem",
            lineHeight: "1.8",
            maxWidth: "728px",

            // Text
            p: {
              marginTop: "1.5em",
              marginBottom: "1.5em",
              fontFamily: theme("fontFamily.serif").join(", "),
            },

            // Headings
            "h1, h2, h3, h4": {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "700",
              letterSpacing: "-0.015em",
            },
            h1: {
              fontSize: "2.5rem",
              lineHeight: "1.2",
              marginTop: "0",
              marginBottom: "1rem",
            },
            h2: {
              fontSize: "2rem",
              lineHeight: "1.3",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h3: {
              fontSize: "1.75rem",
              lineHeight: "1.4",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            },
            h4: {
              fontSize: "1.5rem",
              lineHeight: "1.5",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            },

            // Links
            a: {
              color: "var(--tw-prose-links)",
              textDecoration: "none",
              borderBottomWidth: "1px",
              borderBottomColor: "var(--medium-accent-light)",
              transition: "border-color 0.2s",
              "&:hover": {
                borderBottomColor: "var(--medium-accent)",
              },
            },

            // Quotes
            blockquote: {
              fontStyle: "italic",
              borderLeftWidth: "3px",
              borderLeftColor: "var(--tw-prose-quote-borders)",
              paddingLeft: "1.5rem",
              marginLeft: "0",
              marginRight: "0",
              fontSize: "1.5rem",
              lineHeight: "1.6",
              color: "var(--tw-prose-quotes)",
              fontFamily: theme("fontFamily.serif").join(", "),
            },

            // Lists
            "ul, ol": {
              marginTop: "1.5em",
              marginBottom: "1.5em",
              paddingLeft: "2em",
            },
            li: {
              marginBottom: "0.5em",
              fontFamily: theme("fontFamily.serif").join(", "),
            },

            // Code
            code: {
              fontFamily: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace",
              fontSize: "0.9em",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              padding: "0.2em 0.4em",
              borderRadius: "3px",
              color: "var(--tw-prose-code)",
            },
            pre: {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              padding: "1em",
              borderRadius: "5px",
              overflowX: "auto",
              marginTop: "1.5em",
              marginBottom: "1.5em",
              code: {
                backgroundColor: "transparent",
                padding: "0",
              },
            },

            // Images
            img: {
              maxWidth: "100%",
              height: "auto",
              marginTop: "2em",
              marginBottom: "2em",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "5px",
            },

            // Horizontal rule
            hr: {
              borderTop: "none",
              borderTopWidth: "1px",
              borderTopColor: "var(--tw-prose-hr)",
              marginTop: "2em",
              marginBottom: "2em",
            },
          },
        },
        // Dark mode overrides
        dark: {
          css: {
            "--tw-prose-body": theme("colors.gray.300"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": theme("colors.gray.400"),
            "--tw-prose-links": theme("colors.green.400"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.gray.400"),
            "--tw-prose-bullets": theme("colors.gray.400"),
            "--tw-prose-hr": theme("colors.gray.700"),
            "--tw-prose-quotes": theme("colors.gray.300"),
            "--tw-prose-quote-borders": theme("colors.green.500"),
            "--tw-prose-captions": theme("colors.gray.400"),
            "--tw-prose-code": theme("colors.white"),
            "--tw-prose-pre-code": theme("colors.gray.300"),
            "--tw-prose-pre-bg": theme("colors.gray.900"),
            "--tw-prose-th-borders": theme("colors.gray.700"),
            "--tw-prose-td-borders": theme("colors.gray.700"),
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
