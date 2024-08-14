import { ThemeProvider } from "./components/themes/theme-provider";
import { ModeToggle } from "./components/themes/mode-toggle";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Login/Home";
import Login  from "./pages/Login/Login";
import Header from "./pages/Header";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
