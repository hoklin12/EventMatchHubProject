/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",

        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",

        "status-active": "var(--status-active)",
        "status-active-bg": "var(--status-active-bg)",

        "status-draft": "var(--status-draft)",
        "status-draft-bg": "var(--status-draft-bg)",

        "status-completed": "var(--status-completed)",
        "status-completed-border": "var(--status-completed-border)",
        "status-completed-bg": "var(--status-completed-bg)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      fontWeight: {
        regular: "var(--weight-regular)",
        semibold: "var(--weight-semibold)",
        bold: "var(--weight-bold)",
        extrabold: "var(--weight-extrabold)",
      },
    },
  },
  plugins: [],
};
