import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        primary: '#fff',
        secondary: '#6c757d',
        theme: '#be185d',
        light: '#f3f4f6',
        light2: '#e5e7eb',
        dark1: '#1f2937',
        dark2: '#4b5563',
        dark3: '#9ca3af',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        pcolor: '#a5aaad',
        titleColor: '#2e4a66',
        lightBlue: '#469cac',
        textRed: '#cc3d38',
        textYellow: '#a98921',
        textGreen: '#3b9668',
    },
    fonts: {
        primary: 'Arial, sans-serif',
        secondary: 'Roboto, sans-serif',
    },
    fontsSizes: {
        small: '12px',
        medium: '16px',
        large: '20px',
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
};

export default function Theme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}