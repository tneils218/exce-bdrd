import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "@/interface/approute.interface.tsx";
import ProtectedRoute from "@/pages/ProtectedRoute.tsx";

const RouteWithNavBar: React.FC<{
  element: React.ReactNode;
  showNavBar?: boolean;
  isProtected?: boolean;
}> = ({ element, isProtected }) => {
  return (
    <>{isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}</>
  );
};

export const Routers: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, element, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              <RouteWithNavBar element={element} isProtected={isProtected} />
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};
