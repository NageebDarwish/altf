import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#005687",
    },
    secondary: {
      main: "#0294D3",
    },
    text: {
      primary: "#000000",
      secondary: "#64748B",
    },
    backgroundColor: {
      searchField: "#F1F5F9",
      btnbackground:"#f97316"
    },
    color: {
      customOrange: "#FF7300",
      customPurple: "#0C3373",
      customWhite: "#FFFFFF",
      customOffWhite: "#F0F0F0",
      candyOrange: "#FFDABD",
      lightOrange: "#FFF4EB",
      missionBackground: "#E4EFFF",
      inputFieldBackground: "#F5F5F5",
      inputFieldColor: "#767676",
      btn: "#005687",
    },
    typography: {
      allVariants: {
        color: "#FFFFFF",
      },
      fontFamily: [
        "Roboto",
        "Poppins",
        "sans-serif",
      ].join(","),
    },
  },
});
