import { ThemeProvider } from "./components/themes/theme-provider";
import { Routers } from "./routes";
import NavBar from "@/pages/NavBar.tsx";
import React from "react";
import {
  BrowserRouter as Router,
  matchPath,
  useLocation,
} from "react-router-dom";
import { routes } from "@/interface/approute.interface.tsx";

const AppContent: React.FC = () => {
  const location = useLocation();
  const currentRoute = routes.find((route) => {
    return matchPath(route.path, location.pathname);
  });
  const shouldShowNavBar = currentRoute?.showNavBar;

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {shouldShowNavBar && <NavBar />}
      <Routers />
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
