import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/themes/theme-provider";
import { Routers } from "./routes";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import mediaApi from "./api/media.api";


const App: React.FC =  () => {
 
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ToastContainer />
      <Router>
        <Routers />
      </Router>


    </ThemeProvider>
  );
};

export default App;
