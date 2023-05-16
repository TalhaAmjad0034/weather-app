import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h4: {
      fontSize: "2rem",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "1rem",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "1rem",
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "1rem",
    },
    subtitle1: {
      fontSize: "1.2rem",
      fontWeight: 400,
      color: "#fff",
      marginBottom: "1rem",
    },
  },
});

export default theme;
