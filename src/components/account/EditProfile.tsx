import { FaUserAlt, FaPhone, FaUpload } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import userApi from "@/api/user.api";
import { notify } from "@/commons/notify";
import { StatusCode } from "@/commons/utils";
import axios from "axios";
import { Label } from "@radix-ui/react-dropdown-menu";

// Define schema using zod
const EditProfile = (props: any) => {
  const { user, setIsEditing } = props;
  const [file, setFile] = useState<File | null>(null);
  const [tempAvatarUrl, setTempAvatarUrl] = useState("");
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(() => {
    if (user.dob) {
      const [day, month, year] = user.dob.split("-").map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  });

  const schema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^0\d{9}$/, "Invalid phone number format, example 0123456789"),
    dob: z.date().refine((val) => val < new Date(), "Invalid date"), // Ensure it's a valid date and before current date
    avatar: z
      .any()
      .refine((file) => {
        if (!user.avatarUrl) {
          return file?.[0];
        }
        return true;
      }, "Image is required")
      .refine((file) => {
        if (file?.[0]) {
          return file?.[0]?.size <= 5000000;
        }
        return true;
      }, "File size must be less than 5MB")
      .refine((file) => {
        if (file?.[0]) {
          return ["image/jpeg", "image/png", "image/gif"].includes(
            file?.[0]?.type
          );
        }
        return true;
      }, "File format must be JPG, PNG, or GIF"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      dob: birthDate,
      avatar: avatarBlob,
    },
  });

  useEffect(() => {
    const fetchAvatar = async () => {
      const res = await axios.get(user.avatarUrl, {
        responseType: "blob",
      });
      setAvatarBlob(res.data);
    };
    fetchAvatar();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileVal = e.target.files?.[0];
    if (fileVal) {
      setFile(fileVal);
      setTempAvatarUrl(URL.createObjectURL(fileVal));
    }
  };
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("dob", birthDate ? formatDate(birthDate, "dmy") : "");
      formData.append("file", file || avatarBlob || "");
      const userJson = localStorage.getItem("user");
      if (userJson) {
        const user = JSON.parse(userJson);
        formData.append("id", user.id);
        const updateResponse = await userApi.update(user.id, formData);
        if (updateResponse.status == StatusCode.OK) {
          notify("Edit profile successed!");
          setIsEditing(false);
        } else notify(JSON.parse(updateResponse.data).message);
      }
    } catch {
      notify("Something went wrong while edit profile, try again!");
    }
  };

  const formatDate = (date: Date, type: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    if (type === "ymd") return `${year}-${month}-${day}`;
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="dark:bg-slate-700 bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6 dark:text-gray-200">
          Edit Profile
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Full Name
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserAlt
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <Input
                type="text"
                {...register("fullName")}
                className={`dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                  errors.fullName ? "border-red-500" : ""
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.fullName.message?.toString()?.toString()?.toString()}
              </p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Phone Number
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Input
                type="tel"
                {...register("phoneNumber")}
                className={`dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
                placeholder="0123456789"
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600">
                {errors.phoneNumber.message?.toString()?.toString()}
              </p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Date of Birth
            </Label>
            <div className="mt-1">
              <DatePicker
                selected={birthDate}
                onChange={(date: Date | null) => setBirthDate(date)}
                dateFormat="dd-MM-yyyy"
                className="dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500 w-full border border-gray-300 rounded-md"
              />
            </div>
            {errors.dob && (
              <p className="mt-2 text-sm text-red-600">
                {errors.dob.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Avatar
            </Label>
            <div className="mt-1 flex items-center space-x-4">
              {tempAvatarUrl ? (
                <img
                  src={tempAvatarUrl}
                  alt="Avatar preview"
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Avatar preview"
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUserAlt
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              )}
              <Label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {file ? ( // Kiểm tra xem đã có file được chọn chưa
                  <>{file.name}</>
                ) : user.avatarUrl ? (
                  <>
                    <FaUpload className="h-4 w-4 inline-block mr-2" /> Upload
                    different avatar
                  </>
                ) : (
                  <>
                    <FaUpload className="h-4 w-4 inline-block mr-2" /> Upload
                    new avatar
                  </>
                )}
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                {...register("avatar")}
                onChange={handleAvatarChange}
                className="sr-only dark:bg-slate-600"
              />
            </div>
            {errors.avatar && (
              <p className="mt-2 text-sm text-red-600">
                {errors.avatar.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
