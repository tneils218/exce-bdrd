import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBook, FaCheckCircle, FaChevronRight } from "react-icons/fa";
import { Course, Exam } from "./CoursePage";
import courseApi from "@/api/course.api";
import { useEffect, useState } from "react";

const ExamsPage = () => {
  const location = useLocation();
  const [course,setCourse] = useState<Course | null>(null);;
  const courseId = location.state as number;
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await courseApi.getById(courseId);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
    
  },[])
  const navigate = useNavigate();
  console.log(course);
  if (!course) {
    return (
      <p> Loading...</p>
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
        {course.desc}
      </p>
      <ul>
        {course.exams.map((exam: Exam) => (
          <Link
            key={exam.id}
            to={course.label === "Console" ? `/exercises/${exam.id}` : `/submit/${exam.id}`}
            state={{exam: exam, courseId : course.id}}
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
