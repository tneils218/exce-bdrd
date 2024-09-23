import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaCheckCircle,
  FaChevronRight,
  FaCode,
  FaLayerGroup,
  FaServer,
} from "react-icons/fa";

const ChaptersPage = () => {
  const location = useLocation();
  const course = location.state; // Retrieving the course object from state
  const navigate = useNavigate();

  const renderChapterIcon = (type: string) => {
    switch (type) {
      case "MVC":
        return <FaLayerGroup className="text-blue-500" />;
      case "Console":
        return <FaCode className="text-green-500" />;
      case "API":
        return <FaServer className="text-purple-500" />;
      default:
        return <FaBook className="text-gray-500" />;
    }
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="bg-slate-300 dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {course.title}
        </h2>
        <button
          onClick={() => navigate("/courses")}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition duration-300"
        >
          &times;
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{course.description}</p>
      <ul>
        {course.chapters.map((chapter: any) => (
          <Link
            to={course.title === "Console" ? `/exercies/${chapter.id}` : "/"}
            state={chapter}
            className="block mb-[1px]"
          >
            <li
              key={chapter.id}
              className="flex items-center justify-between p-4 bg-gray-100 dark:bg-slate-700 rounded-lg transition duration-300 hover:bg-gray-200 dark:hover:bg-slate-600"
            >
              <div className="flex items-center">
                {renderChapterIcon(chapter.type)}
                <span className="font-medium ml-3 text-gray-700 dark:text-gray-300">
                  {chapter.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {chapter.completed && (
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

export default ChaptersPage;
