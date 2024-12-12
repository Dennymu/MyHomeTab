// Importing react related
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// Importing mantine
import { createTheme, MantineProvider, colorsTuple } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/tiptap/styles.css";

// Store
import { store } from "./store";

// Importing our
import "./index.css";
import App from "./App.tsx";

const theme = createTheme({
  colors: {
    default: colorsTuple(Array.from({ length: 10 }, () => "#9CC3D2")),
  },
  primaryColor: "default",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
        <Notifications />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
