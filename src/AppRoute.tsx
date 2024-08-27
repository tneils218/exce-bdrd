// AppRoute.tsx
import React from "react";

interface AppRoute {
  path: string;
  element: () => Promise<{ default: React.ComponentType }>; // Function returning a promise resolving to a component
  showNavBar?: boolean;
  isProtected?: boolean;
}

export const routes: AppRoute[] = [
  {
    path: "/",
    element: () => import("@/pages/HomePage.tsx"),
    showNavBar: true,
    isProtected: true,
  },
  {
    path: "/login",
    element: () => import("@/pages/AuthForm/Login.tsx"),
    showNavBar: false,
    isProtected: false,
  },
  {
    path: "/register",
    element: () => import("@/pages/AuthForm/Register.tsx"),
    showNavBar: false,
    isProtected: false,
  },
  {
    path: "/test",
    element: () => import("@/pages/Test.tsx"),
    showNavBar: true,
    isProtected: false,
  },
  {
    path: "*",
    element: () => import("@/pages/404NotFound.tsx"),
    showNavBar: false,
    isProtected: false,
  },
];
