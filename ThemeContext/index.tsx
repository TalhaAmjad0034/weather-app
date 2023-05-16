import { ThemeProvider } from "@mui/material/styles";
import {
  createContext,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";

import lightTheme from "../src/components/MUI/lightTheme";
import darkTheme from "../src/components/MUI/darkTheme";

export const themeContext = createContext("");

const ThemeContextProvider = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => {
  const [currentTheme, setCurrentTheme] = useState(false);

  const changeThemeHandler = () => {
    setCurrentTheme(!currentTheme);
  };

  const value: any = { currentTheme, changeThemeHandler };
  return (
    <themeContext.Provider value={value}>
      <ThemeProvider theme={currentTheme ? lightTheme : darkTheme}>
        {props.children}
      </ThemeProvider>
    </themeContext.Provider>
  );
};

export default ThemeContextProvider;
