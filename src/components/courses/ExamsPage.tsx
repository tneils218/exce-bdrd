import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBook, FaCheckCircle, FaChevronRight } from "react-icons/fa";
import { Course, Exam } from "./CoursePage";

const ExamsPage = () => {
  const location = useLocation();
  const course = location.state as Course;
  const navigate = useNavigate();

  if (!course) {
    return (
      <div className="bg-slate-300 dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto mt-8 p-6">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Course Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          The requested course could not be found. Please check the URL or
          return to the course list.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Return to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-300 dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {course.title}
        </h2>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition duration-300"
        >
          &times;
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {course.description}
      </p>
      <ul>
        {course.exams.map((exam: Exam) => (
          <Link
            key={exam.id}
            to={course.label === "Console" ? `/exercises/${exam.id}` : "/"}
            state={exam}
            className="block mb-[1px]"
          >
            <li
              className="flex items-center justify-between p-4 bg-gray-100 dark:bg-slate-700 rounded-lg transition duration-300 hover:bg-gray-200 dark:hover:bg-slate-600"
            >
              <div className="flex items-center">
                <FaBook className="text-gray-500" />
                <span className="font-medium ml-3 text-gray-700 dark:text-gray-300">
                  {exam.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {exam.isComplete && (
                  <FaCheckCircle className="text-green-500" />
                )}
                <FaChevronRight className="text-gray-400 dark:text-gray-500" />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ExamsPage;
