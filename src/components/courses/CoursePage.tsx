import { Link } from "react-router-dom";
import { useState } from "react";
import courseApi from "@/api/course.api";

export interface Exam {
  id: number;
  title: string;
  content: string;
  isComplete: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  label: string;
  exams: Exam[];
}

const initCourses = [
  {
    id: 1,
    title: "MVC",
    description: "Model-Views-Controller",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    label: "MVC",
    exams: [
      { id: 1, isComplete: true, title: "MVC", content: "Đề bài 1" },
      { id: 2, isComplete: false, title: "Console", content: "Đề bài 2" },
      { id: 3, isComplete: false, title: "API", content: "Đề bài 3" },
    ],
  },
  {
    id: 2,
    title: "Console",
    description: "Basic console exercises",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",

    label: "Console",
    exams: [
      { id: 1, isComplete: true, title: "MVC", content: "Đề bài 1" },
      { id: 2, isComplete: false, title: "Console", content: "Đề bài 2" },
      { id: 3, isComplete: true, title: "API", content: "Đề bài 3" },
    ],
  },
  {
    id: 3,
    title: "WEB API",
    description: "Practice writing API and WEB API",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    label: "MVC",
    exams: [
      { id: 1, isComplete: true, title: "MVC", content: "Đề bài 1" },
      { id: 2, isComplete: false, title: "Console", content: "Đề bài 2" },
      { id: 3, isComplete: false, title: "API", content: "Đề bài 3" },
    ],
  },
  {
    id: 4,
    title: "Kafka",
    description: "Learn about Kafka",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    label: "MVC",
    exams: [
      { id: 1, isComplete: true, title: "MVC", content: "Đề bài 1" },
      { id: 2, isComplete: false, title: "Console", content: "Đề bài 2" },
      { id: 3, isComplete: true, title: "API", content: "Đề bài 3" },
      { id: 4, isComplete: false, title: "API", content: "Đề bài 4" },
    ],
  },
];

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>(initCourses);

  async function fetchCourses() {
    try {
      const res = await courseApi.getAll();
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }
  fetchCourses();
  return (
    <div className="dark:bg-slate-800 bg-slate-300 min-h-screen p-8">
      <div className="flex flex-col sm:gap-12 sm:py-4 sm:pl-20">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
          BDRD Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              state={course}
              aria-label={`View details for ${course.title} course`}
              className="text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-200">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {course.exams.length} exercises
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
