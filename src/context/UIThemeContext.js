import React from "react";

const UIThemeContext = React.createContext();

export const UIThemeProvider = UIThemeContext.Provider;
export const UIThemeConsumber = UIThemeContext.Consumer;

export default UIThemeContext;
