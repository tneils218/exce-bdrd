import React, { useState } from 'react';
import { FaSun, FaMoon, FaStar, FaUsers, FaClock } from 'react-icons/fa';

const CoursePages = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const courses = [
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn the basics of React and build modern web applications. This course covers fundamental concepts, component-based architecture, and state management.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 4.8,
      students: 1500,
      duration: '6 weeks'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Techniques',
      description: 'Master advanced JavaScript concepts and improve your coding skills. Dive deep into closures, prototypes, async programming, and modern ES6+ features.',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 4.9,
      students: 1200,
      duration: '8 weeks'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the principles of user interface and user experience design. Explore color theory, typography, layout design, and user-centered design methodologies.',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 4.7,
      students: 980,
      duration: '5 weeks'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className={`text-4xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Featured Courses</h1>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${isDarkTheme ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 focus:ring-yellow-500' : 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-700'}`}
            aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDarkTheme ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`rounded-xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:scale-105 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-56 object-cover" />
               
              </div>
              <div className="p-6">
                <h2 className={`text-2xl font-bold mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{course.title}</h2>
                <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{course.description}</p>
           
                {/* <button
                  className={`w-full px-6 py-3 rounded-lg transition-colors duration-300 text-white font-semibold ${isDarkTheme ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  Enroll Now
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePages;