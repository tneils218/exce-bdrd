import { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import courseApi from "@/api/course.api";
import examApi from "@/api/exam.api";
import { z } from "zod";
import CustomForm from "../customForm/CustomForm";
import { Course, Exam } from "./CoursePage"; // Assuming Course and Exam are defined in CoursePage
import { notify } from "@/commons/notify";

const courseSchema = (isEdit: boolean) =>
  z.object({
    title: z.string().nonempty("Title a required field"),
    desc: z.string().nonempty("Description is a required field"),
    label: z.string().nonempty("Label is a required field"),
    image: z
      .any()
      .refine(
        (file) => isEdit || file?.[0], // Chỉ yêu cầu file nếu không phải đang chỉnh sửa
        isEdit ? undefined : "Image is required"
      )
      .refine(
        (file) => isEdit || file?.[0]?.size <= 5000000,
        "File size must be less than 5MB"
      )
      .refine(
        (file) =>
          isEdit ||
          ["image/jpeg", "image/png", "image/gif"].includes(file?.[0]?.type),
        "File format must be JPG, PNG, or GIF"
      ),
  });

const examSchema = z.object({
  title: z.string().nonempty("Title is required"), // Đối với trường 'title', yêu cầu là một chuỗi không rỗng
  content: z.string().nonempty("Content is required"), // Tương tự cho 'content'
  files: z.any().refine((files) => {
    if (!files?.[0]) return true; // Không có file, bỏ qua kiểm tra định dạng
    const allowedExtensions = ["zip", "rar"];
    const fileExtension = files[0].name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension); // Kiểm tra định dạng file
  }, "File format must be ZIP or RAR"), // Nếu không hợp lệ, thông báo lỗi
});

const AdminPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [openAddExam, setOpenAddExam] = useState(false);
  const [examPages, setExamPages] = useState<Record<number, number>>({});
  const [expandedExam, setExpandedExam] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState({});
  const examsPerPage = 3;
  const [courseFields] = useState([
    {
      name: "title",
      type: "text",
      placeholder: "Course Title",
      label: "Title",
    },
    {
      name: "desc",
      type: "text",
      placeholder: "Course Description",
      label: "Description",
    },
    {
      name: "label",
      type: "text",
      placeholder: "Course Label",
      label: "Label",
    },
    {
      name: "image",
      type: "file",
      accept: "image/*",
      label: "Image",
      multiple: false,
    },
  ]);

  const [examFields] = useState([
    { name: "title", type: "text", placeholder: "Exam Title", label: "Title" },
    {
      name: "content",
      type: "text",
      placeholder: "Exam Content",
      label: "Content",
    },
    { name: "files", type: "file", label: "File", multiple: true },
  ]);

  const [reloadData, setReloadData] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await courseApi.getAll();
      setCourses(res.data);
      console.log(res.data);
    } catch (error) {
      notify("Error fetching courses, try again!");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (reloadData) {
      fetchCourses();
      setReloadData(false);
    }
  }, [reloadData]);

  const handleAddCourse = (formData: any) => {
    try {
      let user: any;
      let userJson = localStorage.getItem("user");
      if (userJson) user = JSON.parse(userJson);
      formData.append("userId", user.id);

      courseApi.add(formData).then(() => {
        notify("Course added successfully!");
        setReloadData(true);
      });
    } catch {
      notify("Something wen wrong when you try to add course, try again!");
    }
  };

  const handleOpenFormEditCourse = (course: any) => {
    {
      setEditingCourse(course);
      setIsEdit(true);
      setDefaultValues({ title: "", desc: "", label: "", image: null });
    }
  };

  const handleEditCourse = (formData: any) => {
    try {
      formData.append("id", String(editingCourse?.id));
      courseApi.edit(formData).then(() => {
        notify("Course edited successfully!");
        setReloadData(true);
        setEditingCourse(null);
      });
    } catch {
      notify("Something wen wrong when you try to edit course, try again!");
    }
  };

  const handleDeleteCourse = async (id: number) => {
    try {
      await courseApi.delete(id).then(() => {
        notify("Course deleted successfully!");
        setReloadData(true);
      });
    } catch {
      notify("Something wen wrong when you try to delete course, try again!");
    }
  };

  const toggleCourseExpansion = (courseId: number) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const paginateExams = (courseId: number, pageNumber: number) => {
    setExamPages({ ...examPages, [courseId]: pageNumber });
  };

  const getVisibleExams = (course: Course) => {
    const pageNumber = examPages[course.id] || 1;
    const indexOfLastExam = pageNumber * examsPerPage;
    const indexOfFirstExam = indexOfLastExam - examsPerPage;
    return course.exams.slice(indexOfFirstExam, indexOfLastExam);
  };

  const handleAddExam = (formData: any) => {
    try {
      formData.append("courseId", String(expandedCourse));
      examApi.add(formData).then(() => {
        notify("Exam added successfully!");
        setReloadData(true);
        setOpenAddExam(false);
        setDefaultValues({ title: "", desc: "", label: "", image: null });
      });
    } catch {
      notify("Something went wrong when you try to add exam, try again!");
    }
  };

  const handleEditExam = (formData: any) => {
    try {
      formData.append("courseId", String(editingExam?.courseId));
      formData.append("id", String(editingExam?.id));
      examApi.edit(formData).then(() => {
        notify("Exam edited successfully!");
        setEditingExam(null);
        setReloadData(true);
      });
    } catch {
      notify("Something went wrong when you try to edit exam, try again!");
    }
  };

  const toggleExamExpansion = (examId: number) => {
    setExpandedExam(expandedExam === examId ? null : examId);
  };

  const handleDeleteExam = (id: number) => {
    try {
      examApi.delete(id).then(() => {
        notify("Exam deleted successfully!");
        setReloadData(true);
      });
    } catch {
      notify("Something went wrong when you try to delete exam, try again!");
    }
  };

  return (
    <div className="dark:bg-slate-800 bg-slate-300 min-h-screen pl-20 pr-5">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-200 text-gray-800">
        Admin - Courses and Exams
      </h1>
      <div className="dark:bg-slate-700 bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-800 mb-4">
          Add New Course
        </h2>
        <CustomForm
          schema={courseSchema(false)}
          fields={courseFields}
          onSubmit={handleAddCourse}
          defaultValues={defaultValues}
        />
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="dark:bg-slate-700 bg-white p-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleCourseExpansion(course.id)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {expandedCourse === course.id ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
                <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
                  {course.title}
                </h3>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleOpenFormEditCourse(course)}
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-red-500 dark:text-red-400 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {expandedCourse === course.id && (
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {course.desc}
                </p>
                <h4 className="font-semibold mb-2">Exams:</h4>
                <ul className="space-y-2">
                  {getVisibleExams(course).map((exam) => (
                    <li
                      key={exam.id}
                      className="flex flex-col justify-between items-start bg-gray-100 dark:bg-slate-600 dark:text-gray-200 p-2 rounded"
                    >
                      <div className="flex justify-between w-full">
                        <span>{exam.title}</span>
                        <div className="space-x-2 flex items-center">
                          <button
                            onClick={() => toggleExamExpansion(exam.id)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                          >
                            {expandedExam === exam.id ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setEditingExam({
                                courseId: course.id,
                                id: exam.id,
                                title: exam.title, // Sửa thành exam.title
                                content: exam.content, // Sửa thành exam.content
                                isComplete: exam.isComplete, // Dữ liệu từ exam
                                fileExams: exam.fileExams, // Sử dụng đúng fileExams từ exam
                                fileSubmission: exam.fileSubmission, // Sử dụng đúng fileSubmission từ exam
                              });
                              setIsEdit(true);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteExam(exam.id)}
                            className="text-red-500 dark:text-red-400 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      {/* Hiển thị chi tiết khi mở rộng exam */}
                      {expandedExam === exam.id && (
                        <div className="mt-2 text-gray-700 dark:text-gray-300">
                          {/* Hiển thị danh sách file nếu có */}
                          {exam.fileExams && exam.fileExams.length > 0 && (
                            <ul>
                              {exam.fileExams.map((file, index) => (
                                <li key={index}>
                                  <a
                                    href={file.fileUrl} // Sử dụng đúng fileUrl
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    {file.fileName}{" "}
                                    {/* Sử dụng đúng fileName */}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                          {/* Hiển thị nội dung exam */}
                          <p>{exam.content}</p>{" "}
                          {/* Hiển thị đúng nội dung của exam */}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={() =>
                      paginateExams(course.id, (examPages[course.id] || 1) - 1)
                    }
                    disabled={(examPages[course.id] || 1) === 1}
                    className="mx-1 px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  {Array.from({
                    length: Math.ceil(course.exams.length / examsPerPage),
                  }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginateExams(course.id, index + 1)}
                      className={`mx-1 px-3 py-2 rounded ${
                        (examPages[course.id] || 1) === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-slate-400 dark:text-gray-200 dark:border-slate-500 hover:bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      paginateExams(course.id, (examPages[course.id] || 1) + 1)
                    }
                    disabled={
                      (examPages[course.id] || 1) ===
                      Math.ceil(course.exams.length / examsPerPage)
                    }
                    className="mx-1 px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setOpenAddExam(!openAddExam);
                      setDefaultValues({
                        title: "",
                        content: "",
                        file: null,
                      });
                    }}
                    className="font-semibold mb-2 flex items-center gap-2 mr-0 text-red-500"
                  >
                    {!openAddExam ? (
                      <p className="flex items-center">
                        Add new Exam{" "}
                        <span className="ml-1">
                          <FaChevronDown />
                        </span>
                      </p>
                    ) : (
                      <p className="flex items-center">
                        Cancel{" "}
                        <span className="ml-1">
                          <FaChevronUp />
                        </span>
                      </p>
                    )}
                  </button>
                </div>

                {openAddExam && (
                  <CustomForm
                    schema={examSchema}
                    fields={examFields}
                    onSubmit={handleAddExam}
                    defaultValues={defaultValues}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-4 rounded-lg w-96 dark:bg-slate-700 ">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-200 text-gray-800">
                Edit Course
              </h2>
              <button
                onClick={() => setEditingCourse(null)}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition duration-300 pb-4"
              >
                &times;
              </button>
            </div>
            <CustomForm
              schema={courseSchema(isEdit)}
              fields={courseFields}
              onSubmit={handleEditCourse}
              defaultValues={defaultValues}
            />
          </div>
        </div>
      )}

      {editingExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96 dark:bg-slate-700">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-200 text-gray-800">
                Edit Exam
              </h2>
              <button
                onClick={() => setEditingExam(null)}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition duration-300 pb-4"
              >
                &times;
              </button>
            </div>
            <CustomForm
              schema={examSchema}
              fields={examFields}
              onSubmit={handleEditExam}
              defaultValues={{
                title: editingExam.title,
                content: editingExam.content,
                file: editingExam.fileExams,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
