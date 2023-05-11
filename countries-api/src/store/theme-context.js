import { createContext, useState } from 'react';

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false)
    const toggleMode = () => {
        setDarkMode(!darkMode)
    }

    const value = {
        darkMode: darkMode,
        toggleMode: toggleMode,
    }

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}

export default ThemeContextProvider