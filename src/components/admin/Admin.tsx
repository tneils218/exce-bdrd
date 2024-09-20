import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [newChapter, setNewChapter] = useState({ title: "", type: "MVC" });
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [chapterPages, setChapterPages] = useState({});
  
  const chaptersPerPage = 3;

  useEffect(() => {
    // Simulate fetching courses from an API
    const fetchedCourses = [
        {
            id: 1,
            title: "MVC",
            description: "Model-Views-Controller",
            image:
              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            chapters: [
              { id: 1, completed: true, title: "MVC", content: "Đề bài" },
              { id: 2, completed: false, title: "Console", content: "Đề bài" },
              { id: 3, completed: false, title: "API", content: "Đề bài" },
            ],
          },
          {
            id: 2,
            title: "Console",
            description: "Basic console exercices",
            image:
              "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            chapters: [
              { id: 1, completed: true, title: "MVC", content: "Đề bài" },
              { id: 2, completed: false, title: "Console", content: "Đề bài" },
              { id: 3, completed: false, title: "API", content: "Đề bài" },
              { id: 4, completed: false, title: "API", content: "Đề bài" },
              { id: 5, completed: false, title: "API", content: "Đề bài" },
              { id: 6, completed: false, title: "API", content: "Đề bài" },
            ],
          },
          {
            id: 3,
            title: "WEB API",
            description: "Practice writting API and WEB API",
            image:
              "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            chapters: [
              { id: 1, completed: true, title: "MVC", content: "Đề bài" },
              { id: 2, completed: false, title: "Console", content: "Đề bài" },
              { id: 3, completed: false, title: "API", content: "Đề bài" },
            ],
          },
          {
            id: 4,
            title: "Kafka",
            description: "Learn about kafka",
            image:
              "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            chapters: [
              { id: 1, completed: true, title: "MVC", content: "Đề bài" },
              { id: 2, completed: false, title: "Console", content: "Đề bài" },
              { id: 3, completed: false, title: "API", content: "Đề bài" },
              { id: 4, completed: false, title: "API", content: "Đề bài" },
            ],
          },
    ];
    setCourses(fetchedCourses);
    initializeChapterPages(fetchedCourses);
  }, []);

  const initializeChapterPages = (fetchedCourses) => {
    const pages = {};
    fetchedCourses.forEach(course => {
      pages[course.id] = 1;
    });
    setChapterPages(pages);
  };

  const handleAddCourse = () => {
    const newCourseWithId = { ...newCourse, id: Date.now(), chapters: [] };
    setCourses([...courses, newCourseWithId]);
    setNewCourse({ title: "", description: "" });
    setChapterPages({ ...chapterPages, [newCourseWithId.id]: 1 });
  };

  const handleAddChapter = (courseId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: [...course.chapters, { ...newChapter, id: Date.now() }]
        };
      }
      return course;
    }));
    setNewChapter({ title: "", type: "MVC" });
  };

  const handleEditCourse = (course) => {
    setCourses(courses.map(c => c.id === course.id ? course : c));
    setEditingCourse(null);
  };

  const handleEditChapter = (courseId, chapter) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: course.chapters.map(ch => ch.id === chapter.id ? chapter : ch)
        };
      }
      return course;
    }));
    setEditingChapter(null);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    const newChapterPages = { ...chapterPages };
    delete newChapterPages[courseId];
    setChapterPages(newChapterPages);
  };

  const handleDeleteChapter = (courseId, chapterId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: course.chapters.filter(chapter => chapter.id !== chapterId)
        };
      }
      return course;
    }));
  };

  const toggleCourseExpansion = (courseId) => {
  console.log(courseId);
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

 

  // Pagination for chapters
  const paginateChapters = (courseId, pageNumber) => {
    setChapterPages({ ...chapterPages, [courseId]: pageNumber });
  };

  const getVisibleChapters = (course) => {
    const pageNumber = chapterPages[course.id] || 1;
    const indexOfLastChapter = pageNumber * chaptersPerPage;
    const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
    return course.chapters.slice(indexOfFirstChapter, indexOfLastChapter);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin - Courses and Chapters</h1>
      
      {/* Add new course form */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Course Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddCourse}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* List of courses */}
      <div className="space-y-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleCourseExpansion(course.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expandedCourse === course.id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <h3 className="text-xl font-semibold">{course.title}</h3>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingCourse(course)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {expandedCourse === course.id && (
              <div className="mt-4">
                <p className="text-gray-600 mb-4">{course.description}</p>
                <h4 className="font-semibold mb-2">Chapters:</h4>
                <ul className="space-y-2">
                  {getVisibleChapters(course).map(chapter => (
                    <li key={chapter.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                      <span>{chapter.title} - {chapter.type}</span>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingChapter({ ...chapter, courseId: course.id })}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteChapter(course.id, chapter.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Pagination for chapters */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => paginateChapters(course.id, (chapterPages[course.id] || 1) - 1)}
                    disabled={(chapterPages[course.id] || 1) === 1}
                    className="mx-1 px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  {Array.from({ length: Math.ceil(course.chapters.length / chaptersPerPage) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginateChapters(course.id, index + 1)}
                      className={`mx-1 px-3 py-2 rounded ${(chapterPages[course.id] || 1) === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginateChapters(course.id, (chapterPages[course.id] || 1) + 1)}
                    disabled={(chapterPages[course.id] || 1) === Math.ceil(course.chapters.length / chaptersPerPage)}
                    className="mx-1 px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <div className="mt-4 flex space-x-2">
                  <textarea
                    placeholder="New Chapter Title"
                    value={newChapter.title}
                    onChange={(e) =>
                      setNewChapter({ ...newChapter, title: e.target.value })
                    }
                    className="border p-2 rounded w-2/5"
                  />
                  <textarea
                    placeholder="New Chapter Content"
                    value={newChapter.content}
                    onChange={(e) =>
                      setNewChapter({ ...newChapter, content: e.target.value })
                    }
                    className="border p-2 rounded w-3/5 flex-grow"
                  />
                  <button
                    onClick={() => handleAddChapter(course.id)}
                    className="bg-green-500 text-white p-2 px-6 rounded hover:bg-green-600 transition duration-300"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      
      {/* Edit course modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
            <input
              type="text"
              value={editingCourse.title}
              onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              value={editingCourse.description}
              onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingCourse(null)}
                className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditCourse(editingCourse)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit chapter modal */}
      {editingChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Chapter</h2>
            <input
              type="text"
              value={editingChapter.title}
              onChange={(e) => setEditingChapter({...editingChapter, title: e.target.value})}
              className="border p-2 rounded w-full mb-2"
            />
            <select
              value={editingChapter.type}
              onChange={(e) => setEditingChapter({...editingChapter, type: e.target.value})}
              className="border p-2 rounded w-full mb-4"
            >
              <option value="MVC">MVC</option>
              <option value="Console">Console</option>
              <option value="API">API</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingChapter(null)}
                className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditChapter(editingChapter.courseId, editingChapter)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
