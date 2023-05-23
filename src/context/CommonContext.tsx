import React, { createContext } from 'react'

export const ThemeContext = createContext('dark');
export const FontContext = createContext(10);

type CommonContextProps = {
    fontSize: number,
    theme: 'dark' | 'light',
    children?: JSX.Element 
}

export const CommonContext = (props: CommonContextProps) => {
  return(
  <FontContext.Provider value={props.fontSize}>
    <ThemeContext.Provider value={props.theme}>
        {props.children}
    </ThemeContext.Provider>
  </FontContext.Provider>)
}
