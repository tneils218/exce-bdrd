import React, { useEffect } from "react";
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
import authApi from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
import { StatusCode } from "@/commons/utils.ts";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomForm from "@/components/customForm/CustomForm";
import { z } from "zod";
import { notify, resposeFailureNotify } from "@/commons/notify";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});
const forgotPasswordField = [
  {
    name: "email",
    type: "text",
    placeholder: "Your email",
    label: "Enter your email to get your confirmation link",
  },
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = React.useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false); // Thêm state này để quản lý Dialog

  const clearData = () => {
    setPostData({ username: "", password: "" });
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDialogOpen) return; // Ngăn không submit form login khi dialog mở

    try {
      const response = await authApi.login(postData.username, postData.password);
      console.log("response login");
      if (response.status === StatusCode.OK) {
        localStorage.setItem("token", `${response.data.data.token}`);
        localStorage.setItem("user", `${JSON.stringify(response.data.data)}`);
        localStorage.setItem("expires", `${response.data.data.expires}`);
        navigate("/");
      }
      clearData();
    } catch (error: any) {
      setErrorMessage(error?.response.data.message);
    }
  };

  const handleForgotPassword = async (data: any) => {
    try {
      const res = await authApi.fotgotPassword(data);
      if (res.status === 200) {
        notify("Please check your email!"); 
        setIsDialogOpen(false); 
      }
    } catch (error: any) {
      resposeFailureNotify(error);
    }
  };

  useEffect(() => {
    const handleEnterKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isDialogOpen) {
        e.preventDefault(); 
      }
    };

    document.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [isDialogOpen]);

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
          <form autoComplete="off" onSubmit={handleSubmitLogin}>
            <div className="grid gap-4">
              {errorMessage && (
                <div className="text-red-500 text-sm text-center">
                  {errorMessage}
                </div>
              )}
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
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <p className="ml-auto inline-block text-sm underline cursor-pointer">
                        Forgot your password?
                      </p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle> Forgot password</DialogTitle>
                      <CustomForm
                        schema={forgotPasswordSchema}
                        fields={forgotPasswordField}
                        onSubmit={handleForgotPassword}
                        defaultValues={{
                         email: ""
                        }}
                      />
                    </DialogContent>
                  </Dialog>
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
