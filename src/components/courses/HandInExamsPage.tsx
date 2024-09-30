import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import CustomForm from "../customForm/customForm";
import { z } from "zod";
import submissionApi from "@/api/submission.api";

const schema = z.object({
  exam: z
    .any()
    .refine((file) => file?.[0], "File is required")
    .refine((file) => {
      const allowedExtensions = ["zip", "rar"];
      const fileExtension = file?.[0]?.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(fileExtension);
    }, "File format must be ZIP or RAR"),
});

const HandInExamsPage = () => {
  const fields = [{ name: "exam", type: "file", accept: "" }];
  const location = useLocation();
  const state = location.state;
  console.log(state);

  const handleAddCourse = (formData: FormData) => {
    let user: any;
    let userJson = localStorage.getItem("user");
    if (userJson) user = JSON.parse(userJson);
    formData.append("userId", user.id);
    formData.append("examId", state.exam.id);
    submissionApi.submit(formData);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="w-full max-w-2xl bg-slate-300 dark:bg-slate-800 shadow-md rounded-lg p-6 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Link to={`/course/${state.courseId}`} state={state.courseId}>
            <button className="flex items-center text-blue-500 hover:text-blue-600 transition duration-300">
              <FaArrowLeft className="mr-2" /> Back to Exercises
            </button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          {state.exam.title}
        </h2>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-white dark:bg-slate-700 rounded-lg shadow p-4">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Exercise
            </h3>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              {state.exam.content}
            </p>

            <CustomForm
              schema={schema}
              fields={fields}
              onSubmit={handleAddCourse}
              defaultValues={{
                exam: null,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandInExamsPage;
