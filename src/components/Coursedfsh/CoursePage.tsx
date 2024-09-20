import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";

const CoursePage = () => {
  const [courses] = useState([
    {
      id: 1,
      title: "MVC",
      description: "Model-Views-Controller",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      chapters: [
        { id: 1, completed: true, title: "MVC", content: "Đề bài 1" },
        { id: 2, completed: false, title: "Console", content: "Đề bài 2" },
        { id: 3, completed: false, title: "API", content: "Đề bài 3" },
      ],
    },
    {
      id: 2,
      title: "Console",
      description: "Basic console exercices",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      chapters: [
        { id: 1, completed: true, title: "MVC", content: "Đề bài 1" },
        { id: 2, completed: false, title: "Console", content: "Đề bài 2" },
        { id: 3, completed: false, title: "API", content: "Đề bài 3" },
        { id: 4, completed: false, title: "API" , content: "Đề bài 4"},
        { id: 5, completed: false, title: "API", content: "Đề bài 5" },
        { id: 6, completed: false, title: "API", content: "Đề bài 6" },
      ],
    },
    {
      id: 2,
      title: "WEB API",
      description: "Practice writting API and WEB API",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      chapters: [
        { id: 1, completed: true, title: "MVC", content: "Đề bài 1" },
        { id: 2, completed: false, title: "Console", content: "Đề bài 2" },
        { id: 3, completed: false, title: "API", content: "Đề bài 3" },
      ],
    },
    {
      id: 2,
      title: "Kafka",
      description: "Learn about kafka",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      chapters: [
        { id: 1, completed: true, title: "MVC", content: "Đề bài 1" },
        { id: 2, completed: false, title: "Console", content: "Đề bài 2" },
        { id: 3, completed: false, title: "API", content: "Đề bài 3" },
        { id: 4, completed: false, title: "API", content: "Đề bài 4" },
      ],
    }
  ]);

  return (
    <div className="flex flex-col sm:gap-12 sm:py-4 sm:pl-20" >
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 " >
        Available Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {courses.map((course) => (
          <Link
            to={`/course/${course.id}`}
            state={course}
            className="text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="font-bold text-xl mb-2 text-gray-800">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {course.chapters.length} exercises
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
