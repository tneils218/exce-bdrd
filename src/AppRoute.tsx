import React from "react";
import HomePage from "@/pages/HomePage.tsx";
import Login from "@/pages/AuthForm/Login.tsx";
import Register from "@/pages/AuthForm/Register.tsx";
import Test from "@/pages/Test.tsx";
import NotFoundPage from "@/pages/404NotFound.tsx";

interface AppRoute {
  path: string;
  element: React.ReactNode;
  showNavBar?: boolean;
  isProtected?: boolean;
}

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <HomePage />,
    showNavBar: true,
    isProtected: true,
  },
  {
    path: "/login",
    element: <Login />,
    showNavBar: false,
    isProtected: false,
  },
  {
    path: "/register",
    element: <Register />,
    showNavBar: false,
    isProtected: false,
  },
  {
    path: "/test",
    element: <Test />,
    showNavBar: true,
    isProtected: false,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    showNavBar: false,
    isProtected: false,
  },
];
