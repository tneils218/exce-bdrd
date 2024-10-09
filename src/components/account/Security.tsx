// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "@radix-ui/react-dropdown-menu";
// import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
// import CustomForm from "../customForm/CustomForm";

// const ChangePasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     console.log({ email, oldPassword, newPassword, confirmPassword });
//   };
//   const changePasswordSchema = z.object({
//     oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
//     newPassword: z.string().min(6, "New password must be at least 6 characters"),
//     confirmPassword: z
//       .string()
//       .min(6, "Confirm password must be at least 6 characters")
//       .refine((value, context) => {
//         if (value !== context.parent.newPassword) {
//           return false;
//         }
//         return true;
//       }, "Passwords do not match"),
//   });
  

  
//     const handleChangePassword = (formData: any) => {
//       try{
//         submissionApi.submit(formData);
//         notify("Add exam successed!");
//       }
//       catch {
//         notify("Something happended while adding exam, please try again!");
//       }


//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
//       <form
//         onSubmit={handleChangePassword}
//         className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4 dark:bg-slate-800 "
//       >
//         <h2 className="text-lg font-semibold text-gray-700 text-center dark:text-gray-200">
//           Đổi Mật Khẩu
//         </h2>
//         <div>
//           <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Email
//           </Label>
//           <Input
//             type="email"
//             id="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className=" dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>
//         <div>
//           <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Mật khẩu cũ
//           </Label>
//           <Input
//             type="password"
//             id="oldPassword"
//             required
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="mt-1 block w-full p-2 border dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>
//         <div>
//           <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Mật khẩu mới
//           </Label>
//           <Input
//             type="password"
//             id="newPassword"
//             required
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className=" dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>
//         <div>
//           <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Xác nhận mật khẩu mới
//           </Label>
//           <Input
//             type="password"
//             id="confirmPassword"
//             required
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>Change Password</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Change Password</DialogTitle>
//               <DialogDescription>
//                 Please enter your new password below.
//               </DialogDescription>
//             </DialogHeader>
//             <CustomForm
//               schema={schema}
//               fields={fields}
//               onSubmit={(handleAddExam)}
//               defaultValues={{
//                 file: null,
//               }}
//             />
//             <DialogFooter>
//               <DialogClose asChild>
//                 <Button>Cancel</Button>
//               </DialogClose>
//               <Button type="submit">Save</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </form>
//     </div>
//   );
// };

// export default ChangePasswordForm;
