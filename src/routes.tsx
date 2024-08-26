import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const Test = lazy(() => import("./pages/Test.tsx"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/AuthForm/Login"));
const Register = lazy(() => import("./pages/AuthForm/Register"));

export const Routers: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Suspense>
  );
};
