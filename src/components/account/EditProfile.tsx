import {
    FaUserAlt,
    FaPhone,
    FaCalendarAlt,
    FaUpload,
  } from "react-icons/fa";
  import DatePicker from "react-datepicker";
  import { ClipLoader } from "react-spinners";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import "react-datepicker/dist/react-datepicker.css";
  import { Input } from "../ui/input";
  import { useState } from "react";
  
  // Define schema using zod
  const schema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    dob: z.date(),
    avatar: z
      .any()
      .refine(
        (file) => file, 
        { message: "Image is required" }
      )
      .refine(
        (file) => {console.log(file.item),
            file.size <= 5000000,
        { message: "File size must be less than 5MB" }}
      )
      .refine(
        (file) =>
          ["image/jpeg", "image/png", "image/gif"].includes(file.type),
        { message: "File format must be JPG, PNG, or GIF" }
      ),
  });
  
  const EditProfile = (props: any) => {
    const { user, setIsEditing } = props;
    const [isUploading, setIsUploading] = useState(false);
    const [day, month, year] = user.dob.split('/');
    const [birthDate,setBirthDate] = useState(new Date(new Date(year, month - 1, day)));

    // Create a new Date object (Note: month is 0-indexed in JavaScript Date)
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        dob: new Date(user.dob),
        avatar: null,
      },
    });
  
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      console.log(file);
      if (file) {
        setValue("avatar", file);
      }
    };
  
    const onSubmit = (data: any) => {
      console.log("Form submitted:", data);
      setIsEditing(false);
    };
  
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Edit Profile</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserAlt className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  type="text"
                  {...register("fullName")}
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
            </div>
  
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  type="tel"
                  {...register("phoneNumber")}
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                  placeholder="+1234567890"
                />
              </div>
              {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>}
            </div>
  
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>  
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => 
                    {
                        console.log(date);
                        setValue("dob", date)
                        setBirthDate(date);
                    }}
                  
                  dateFormat="dd/MM/yyyy"
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                    errors.dob ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.dob && <p className="mt-2 text-sm text-red-600">{errors.dob.message}</p>}
            </div>
  
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
              <div className="mt-1 flex items-center space-x-4">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar preview" className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUserAlt className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                )}
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isUploading ? <ClipLoader size={20} color="#4F46E5" /> : <><FaUpload className="h-4 w-4 inline-block mr-2" /> Upload new avatar</>}
                </label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  {...register("avatar")}
                  onChange={handleAvatarChange}
                  className="sr-only"
                />
              </div>
              {errors.avatar && <p className="mt-2 text-sm text-red-600">{errors.avatar.message}</p>}
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
  