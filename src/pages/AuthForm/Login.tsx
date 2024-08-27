import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import authApi from "@/api/login.api.ts";
import { useNavigate } from "react-router-dom";
import { StatusCode } from "@/commons/utils.ts";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = React.useState({
    username: "",
    password: "",
  });
  const clearData = () => {
    setPostData({ username: "", password: "" });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await authApi.login(
        postData.username,
        postData.password,
      );
      if (response.status === StatusCode.OK) {
        localStorage.setItem("token", `${response.data.data.token}`);
        localStorage.setItem("user", `${JSON.stringify(response.data.data)}`);
        localStorage.setItem("expires", `${response.data.data.expires}`);
        navigate("/");
      }
      clearData();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) =>
                    setPostData({ ...postData, username: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) =>
                    setPostData({ ...postData, password: e.target.value })
                  }
                />
              </div>
              <Button type="submit" variant="outline" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
