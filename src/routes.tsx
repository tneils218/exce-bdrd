import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/pages/ProtectedRoute.tsx";
import NavBar from "@/pages/NavBar.tsx";
import { routes } from "@/AppRoute.tsx";

const RouteWithNavBar: React.FC<{
  element: React.ReactNode;
  showNavBar?: boolean;
  isProtected?: boolean;
}> = ({ element, showNavBar, isProtected }) => {
  return (
    <>
      {showNavBar && <NavBar />}
      {isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
    </>
  );
};

export const Routers: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, element: Element, showNavBar, isProtected }) => {
          const LazyComponent = lazy(Element);
          return (
            <Route
              key={path}
              path={path}
              element={
                <RouteWithNavBar
                  element={<LazyComponent />}
                  showNavBar={showNavBar}
                  isProtected={isProtected}
                />
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};
