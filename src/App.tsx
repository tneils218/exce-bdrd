import { ThemeProvider } from "./components/themes/theme-provider";
import { Routers } from "./routes";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routers />
      </Router>
    </ThemeProvider>
  );
};

export default App;
