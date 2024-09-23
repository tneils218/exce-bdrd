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
    element: () => import("@/components/courses/CoursePage.tsx"),
    showNavBar: true,
    isProtected: false,
  },
  {
    path: "/course/:id",
    element: () => import("@/components/courses/ChaptersPage.tsx"),
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
    path: "/test",
    element: () => import("@/pages/Test.tsx"),
    showNavBar: true,
    isProtected: false,
  },
  {
    path: "/exercies/:id",
    element: () => import("@/components/editor/CodeEditorDetail"),
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
