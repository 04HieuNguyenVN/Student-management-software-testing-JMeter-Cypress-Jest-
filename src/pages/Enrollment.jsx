import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import {
  MOCK_ENROLLMENTS,
  MOCK_STUDENTS,
  MOCK_SUBJECTS,
} from "../data/mockData";

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  // Filter states
  const [filterStudent, setFilterStudent] = useState("");
  const [filterSemester, setFilterSemester] = useState("");

  useEffect(() => {
    setEnrollments(MOCK_ENROLLMENTS);
  }, []);

  const handleAddEnrollment = () => {
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedStudent || !selectedSubject) {
      alert("Vui lòng chọn sinh viên và môn học!");
      return;
    }

    // Check if already enrolled
    const exists = enrollments.find(
      (e) =>
        e.studentId === parseInt(selectedStudent) &&
        e.subjectId === parseInt(selectedSubject)
    );

    if (exists) {
      alert("Sinh viên đã đăng ký môn học này!");
      return;
    }

    const newEnrollment = {
      id: enrollments.length + 1,
      studentId: parseInt(selectedStudent),
      subjectId: parseInt(selectedSubject),
      semester: "HK1 2024-2025",
      status: "active",
      enrolledDate: new Date().toISOString().split("T")[0],
    };

    setEnrollments([...enrollments, newEnrollment]);
    alert("Đăng ký học phần thành công!");
    setShowModal(false);
    setSelectedStudent("");
    setSelectedSubject("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đăng ký này?")) {
      setEnrollments(enrollments.filter((e) => e.id !== id));
      alert("Đã hủy đăng ký thành công!");
    }
  };

  const getStudentInfo = (studentId) => {
    const student = MOCK_STUDENTS.find((s) => s.id === studentId);
    return student ? `${student.fullName} (${student.studentCode})` : "N/A";
  };

  const getSubjectInfo = (subjectId) => {
    const subject = MOCK_SUBJECTS.find((s) => s.id === subjectId);
    return subject ? `${subject.name} (${subject.code})` : "N/A";
  };

  const getSubjectCredits = (subjectId) => {
    const subject = MOCK_SUBJECTS.find((s) => s.id === subjectId);
    return subject ? subject.credits : 0;
  };

  const getTotalCredits = (studentId) => {
    const studentEnrollments = enrollments.filter(
      (e) => e.studentId === studentId
    );
    return studentEnrollments.reduce(
      (total, e) => total + getSubjectCredits(e.subjectId),
      0
    );
  };

  // Filter Logic
  const filteredEnrollments = enrollments.filter((e) => {
    const matchStudent = filterStudent
      ? e.studentId === parseInt(filterStudent)
      : true;
    const matchSemester = filterSemester
      ? e.semester === filterSemester
      : true;
    return matchStudent && matchSemester;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Đăng ký học phần</h1>
        <button
          onClick={handleAddEnrollment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Đăng ký mới</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-sm opacity-90">Tổng đăng ký</p>
          <p className="text-3xl font-bold mt-2">{enrollments.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-sm opacity-90">Đang hoạt động</p>
          <p className="text-3xl font-bold mt-2">
            {enrollments.filter((e) => e.status === "active").length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-sm opacity-90">Sinh viên tham gia</p>
          <p className="text-3xl font-bold mt-2">
            {new Set(enrollments.map((e) => e.studentId)).size}
          </p>
        </div>
      </div>



      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sinh viên
            </label>
            <select
              value={filterStudent}
              onChange={(e) => setFilterStudent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả sinh viên</option>
              {MOCK_STUDENTS.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.fullName} ({student.studentCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Học kỳ
            </label>
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả học kỳ</option>
              {/* Mock semesters */}
              <option value="1">Học kỳ 1</option>
              <option value="2">Học kỳ 2</option>
              <option value="HK1 2024-2025">HK1 2024-2025</option>
            </select>
          </div>

          <div className="flex items-end">
             <button
              onClick={() => {
                  setFilterStudent("");
                  setFilterSemester("");
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sinh viên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Môn học
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số tín chỉ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Học kỳ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đăng ký
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEnrollments.map((enrollment) => (
              <tr key={enrollment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getStudentInfo(enrollment.studentId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getSubjectInfo(enrollment.subjectId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getSubjectCredits(enrollment.subjectId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {enrollment.semester}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {enrollment.enrolledDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    <CheckCircle size={14} className="mr-1" />
                    {enrollment.status === "active" ? "Đang học" : "Đã hủy"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(enrollment.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Hủy đăng ký"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Đăng ký học phần mới</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sinh viên <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn sinh viên</option>
                    {MOCK_STUDENTS.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.fullName} ({student.studentCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Môn học <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn môn học</option>
                    {MOCK_SUBJECTS.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name} ({subject.code}) - {subject.credits} TC
                      </option>
                    ))}
                  </select>
                </div>

                {selectedStudent && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Tổng tín chỉ hiện tại:</strong>{" "}
                      {getTotalCredits(parseInt(selectedStudent))} TC
                    </p>
                    {selectedSubject && (
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>Sau khi đăng ký:</strong>{" "}
                        {getTotalCredits(parseInt(selectedStudent)) +
                          getSubjectCredits(parseInt(selectedSubject))}{" "}
                        TC
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedStudent("");
                    setSelectedSubject("");
                  }}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollment;
