import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: "#3b82f6" }, // tailwind blue-500
    secondary: { main: "#111827" }, // gray-900
    error: { main: red.A400 },
  },
  typography: {
    fontFamily: ['"Inter"', '"Urbanist"', "system-ui", "sans-serif"].join(","),
  },
});

export default theme;