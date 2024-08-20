import { ThemeProvider } from "./components/themes/theme-provider";
import { Routers } from "./routes";
import NavBar from "@/pages/NavBar.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <NavBar />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
