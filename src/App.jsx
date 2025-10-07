import Router from "./routes";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { SnackbarProvider } from "notistack";
import ScrollReset from "./components/ScrollReset";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          {/* <ErrorBoundary> */}
          <Router />
          <ScrollReset />
          {/* </ErrorBoundary> */}
          <ToastContainer />
        </StyledEngineProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
