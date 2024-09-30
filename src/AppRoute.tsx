// AppRoute.tsx
import React from "react";

interface AppRoute {
  path: string;
  element: () => Promise<{ default: React.ComponentType }>;
  showNavBar?: boolean;
  isProtected?: boolean;
}

export const routes: AppRoute[] = [
  {
    path: "/",
    element: () => import("@/components/courses/CoursePage"),
    showNavBar: true,
    isProtected: false,
  },
  {
    path: "/course/:id",
    element: () => import("@/components/courses/ExamsPage"),
    showNavBar: true,
    isProtected: false,
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
    path: "/profile",
    element: () => import("@/components/account/Profile"),
    showNavBar: true,
    isProtected: false,
  },
  {
    path: "/test",
    element: () => import("@/pages/Test.tsx"),
    showNavBar: true,
    isProtected: false,
  },
  {
    path: "/exercises/:id",
    element: () => import("@/components/editor/CodeEditorDetail"),
    showNavBar: true,
    isProtected: false,
  },
  {
    path: "/submit/:id",
    element: () => import("@/components/courses/HandInExamsPage"),
    showNavBar: true,
    isProtected: false,
  },
  {
    path: "/admin",
    element: () => import("@/components/courses/AdminPage"),
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
