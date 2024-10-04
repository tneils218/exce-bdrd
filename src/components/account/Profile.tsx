import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditProfile from "./EditProfile";
import userApi from "@/api/user.api";
import { notify } from "@/commons/notify";
import { Link } from "react-router-dom";

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
    let userLocal;
    const userJson = localStorage.getItem("user");
    if (userJson) userLocal = JSON.parse(userJson);
    async function fectchUser(id: string) {
      try {
        const res = await userApi.getById(id);
        setUser(res.data);
      } catch {
        notify("Error fetching courses:");
      }
    }
    fectchUser(userLocal.id);
  }, [isEditing]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen dark:bg-slate-800 bg-slate-300 p-8 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto pl-20 ">
        {isEditing ? (
          <EditProfile user={user} setIsEditing={setIsEditing} />
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-slate-700 ">
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
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Link to={"/password"}/>
              </button>
            </div>
            <div className="border-t border-gray-200 sm:grid sm:grid-cols-2 ">
              <dl className="dark:bg-slate-700 bg-white">
                <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500 ">
                    Full name
                  </dt>
                  <dd className=" dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.fullName}
                  </dd>
                </div>
                <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.phoneNumber}
                  </dd>
                </div>
                <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" dark:text-gray-100 text-sm font-medium text-gray-500">
                    Date of birth
                  </dt>
                  <dd className=" dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.dob}
                  </dd>
                </div>

                <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">Role</dt>
                  <dd className=" dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.role}
                  </dd>
                </div>
                <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="dark:text-gray-200 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
              </dl>
              <dl>
                <div className=" px-4 py-5 ">
                  <dt className="dark:text-gray-100 text-sm font-medium text-gray-500">Avatar</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <img
                      src={user.avatarUrl}
                      alt="Avatar"
                      className="h-4/6 w-4/6 rounded-full"
                    />
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
