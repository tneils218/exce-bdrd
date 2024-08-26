import { ThemeProvider } from "./components/themes/theme-provider";
import { Routers } from "./routes";
import NavBar from "@/pages/NavBar.tsx";
import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNavBarRoutes = ["/login", "/register"];
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {!shouldHideNavBar && <NavBar />}
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
