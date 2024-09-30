import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditProfile from "./EditProfile";
// import "react-datepicker/dist/react-datepicker.css";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  dob: string;
  avatarUrl: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) setUser(JSON.parse(userJson));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  //   const [errors, setErrors] = useState({});
  //   const [isUploading, setIsUploading] = useState(false);

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //     validateField(name, value);
  //   };

  //   const handleDateChange = (date) => {
  //     setFormData({ ...formData, dob: date });
  //     validateField("dob", date);
  //   };

  //   const handleAvatarChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setIsUploading(true);
  //       setTimeout(() => {
  //         setFormData({ ...formData, avatar: URL.createObjectURL(file) });
  //         setIsUploading(false);
  //       }, 1500);
  //     }
  //     validateField("avatar", file);
  //   };

  //   const validateField = (name, value) => {
  //     let newErrors = { ...errors };

  //     switch (name) {
  //       case "fullName":
  //         if (!value.trim()) {
  //           newErrors.fullName = "Full name is required";
  //         } else {
  //           delete newErrors.fullName;
  //         }
  //         break;
  //       case "phoneNumber":
  //         const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  //         if (!phoneRegex.test(value)) {
  //           newErrors.phoneNumber = "Invalid phone number format";
  //         } else {
  //           delete newErrors.phoneNumber;
  //         }
  //         break;
  //       case "dob":
  //         if (!value) {
  //           newErrors.dob = "Date of birth is required";
  //         } else {
  //           delete newErrors.dob;
  //         }
  //         break;
  //       case "avatar":
  //         if (value && value.size > 5000000) {
  //           newErrors.avatar = "Avatar file size exceeds 5MB limit";
  //         } else {
  //           delete newErrors.avatar;
  //         }
  //         break;
  //       case "email":
  //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //         if (!emailRegex.test(value)) {
  //           newErrors.email = "Invalid email address";
  //         } else {
  //           delete newErrors.email;
  //         }
  //         break;
  //       default:
  //         break;
  //     }

  //     setErrors(newErrors);
  //   };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {isEditing ? (
          <EditProfile user={user} setIsEditing={setIsEditing} />
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Profile
              </h3>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.fullName}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.phoneNumber}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.dob}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Avatar</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <img
                      src={user.avatarUrl}
                      alt="Avatar"
                      className="h-20 w-20 rounded-full"
                    />
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.role}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
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

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {isEditing ? <EditForm /> : <ProfileView />}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
