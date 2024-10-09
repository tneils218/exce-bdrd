import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditProfile from "./EditProfile";
import userApi from "@/api/user.api";
import { notify } from "@/commons/notify";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CustomForm from "../customForm/CustomForm";
import { z } from "zod";
import authApi from "@/api/login.api";
import { StatusCode } from "@/commons/utils";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  dob: string;
  avatarUrl: string;
}

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .superRefine(({ currentPassword, newPassword, confirmPassword }, ctx) => {
    if (newPassword === currentPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password cannot be the same as the current password",
        path: ["newPassword"],
      });
    }

    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const changePasswordFields = [
  {
    name: "currentPassword",
    type: "password",
    placeholder: "Current Password",
    label: "Current Password",
  },
  {
    name: "newPassword",
    type: "password",
    placeholder: "New Password",
    label: "New Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm New Password",
    label: "Confirm New Password",
  },
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      notify("User not found.");
      return;
    }
    
    const userLocal = JSON.parse(userJson);
    async function fetchUser(id: string) {
      try {
        const res = await userApi.getById(id);
        setUser(res.data);
      } catch {
        notify("Error fetching user data.");
      }
    }
    fetchUser(userLocal.id);
  }, [isEditing]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleChangePassword = async (data: FormData) => {
    try {
      data.append("email", user.email);
      data.delete("confirmPassword");
      const res= await authApi.changePassword(data);
      if(res.status == StatusCode.OK) notify("Change password successed.");
      else console.log(res);
     
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data?.[0].description || "Invalid request data";
        notify(errorMessage);
      } else {
        notify("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen dark:bg-slate-800 bg-slate-300 p-8 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto pl-20">
        {isEditing ? (
          <EditProfile user={user} setIsEditing={setIsEditing} />
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-slate-700">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                User Profile
              </h3>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            </div>
            <div className="border-t border-gray-200 sm:grid sm:grid-cols-2">
              <dl className="dark:bg-slate-700 bg-white">
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.fullName}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.phoneNumber}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">
                    Date of birth
                  </dt>
                  <dd className="dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.dob}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">
                    Role
                  </dt>
                  <dd className="dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.role}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
              </dl>
              <dl>
                <div className="px-4 py-5">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">
                    Avatar
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <img
                      src={user.avatarUrl}
                      alt="Avatar"
                      className="h-4/6 w-4/6 rounded-full"
                    />
                  </dd>
                  <dd className="mt-10 text-sm text-gray-900 flex justify-end">
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button>Change Password</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change Password</DialogTitle>
                          <DialogDescription>
                            Please enter your new password below.
                          </DialogDescription>
                        </DialogHeader>
                        <CustomForm
                          schema={changePasswordSchema}
                          fields={changePasswordFields}
                          onSubmit={handleChangePassword}
                          defaultValues={{
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
