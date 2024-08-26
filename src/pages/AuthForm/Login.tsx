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
import userStore from "@/stores/user.store.ts";
import authApi from "@/api/login.api.ts";

const Login: React.FC = () => {
  const { set } = userStore((state: any) => state);

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
      // Gọi API login
      const response = await authApi.login(
        postData.username,
        postData.password,
      );
      set(response);
      // Xử lý phản hồi từ API nếu cần
      console.log(response);

      // Xóa dữ liệu sau khi API trả về thành công
      clearData();
    } catch (error) {
      // Xử lý lỗi nếu có
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
