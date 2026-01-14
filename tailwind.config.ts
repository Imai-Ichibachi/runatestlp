import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primaryBg: "var(--primary-bg)",
                secondaryBg: "var(--secondary-bg)",
                accentPurple: "var(--accent-purple)",
                silver: "var(--silver)",
                moonlight: "var(--moonlight)",
                gold: "var(--gold-accent)",
                textPrimary: "var(--text-primary)",
                textSecondary: "var(--text-secondary)",
            },
            fontFamily: {
                sans: ['"Zen Kaku Gothic New"', "sans-serif"],
                serif: ['"Noto Serif JP"', "serif"],
            },
            backgroundImage: {
                'mystical': "var(--gradient-mystical)",
            }
        },
    },
    plugins: [],
};
export default config;
