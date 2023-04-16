import React from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import App from "./components/App/App";
import { locales, loadLocaleStrings } from "./i18n/locales";
import { LocalizationProvider } from "./components/LocalizationProvider";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode!);

root.render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <LocalizationProvider
        locale="en-US"
        defaultLocale="en-US"
        locales={locales}
        storage={localStorage}
        localeLoader={loadLocaleStrings}
      >
        <App />
      </LocalizationProvider>
    </FluentProvider>
  </React.StrictMode>
);
