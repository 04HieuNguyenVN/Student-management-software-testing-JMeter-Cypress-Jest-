import { useState } from "react";
import { BarChart3, FileText, Download, LayoutDashboard, Users, BookOpen, GraduationCap } from "lucide-react";
import {
  MOCK_STUDENTS,
  MOCK_GRADES,
  MOCK_SUBJECTS,
  MOCK_CLASSES,
  MOCK_DEPARTMENTS,
  MOCK_ENROLLMENTS,
} from "../data/mockData";

const Reports = () => {
  const [reportType, setReportType] = useState("dashboard");
  const [filterClass, setFilterClass] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  const getDashboardStats = () => {
    const totalStudents = MOCK_STUDENTS.length;
    const totalClasses = MOCK_CLASSES.length;
    const totalSubjects = MOCK_SUBJECTS.length;
    const totalDepartments = MOCK_DEPARTMENTS.length;
    
    // Calculate overall average GPA
    const totalGPA = MOCK_GRADES.reduce((sum, g) => sum + g.averageScore, 0);
    const avgGPA = (totalGPA / MOCK_GRADES.length).toFixed(2);

    return {
      totalStudents,
      totalClasses,
      totalSubjects,
      totalDepartments,
      avgGPA
    };
  };

  const getStudentReport = () => {
    let students = [...MOCK_STUDENTS];

    if (filterClass) {
      students = students.filter((s) => s.classId === parseInt(filterClass));
    }

    if (filterDepartment) {
      students = students.filter(
        (s) => s.departmentId === parseInt(filterDepartment)
      );
    }

    return students.map((student) => {
      const studentGrades = MOCK_GRADES.filter(
        (g) => g.studentId === student.id
      );
      const avgGrade =
        studentGrades.length > 0
          ? (
              studentGrades.reduce((sum, g) => sum + g.averageScore, 0) /
              studentGrades.length
            ).toFixed(2)
          : "N/A";

      const enrollmentCount = MOCK_ENROLLMENTS.filter(
        (e) => e.studentId === student.id
      ).length;

      return {
        ...student,
        avgGrade,
        enrollmentCount,
      };
    });
  };

  const getGradeReport = () => {
    const grades = [...MOCK_GRADES];
    const gradeStats = {
      excellent: grades.filter((g) => g.averageScore >= 9).length,
      good: grades.filter((g) => g.averageScore >= 8 && g.averageScore < 9)
        .length,
      fair: grades.filter((g) => g.averageScore >= 7 && g.averageScore < 8)
        .length,
      average: grades.filter((g) => g.averageScore >= 5 && g.averageScore < 7)
        .length,
      poor: grades.filter((g) => g.averageScore < 5).length,
    };

    return gradeStats;
  };

  const getEnrollmentReport = () => {
    const subjects = MOCK_SUBJECTS.map((subject) => {
      const enrollmentCount = MOCK_ENROLLMENTS.filter(
        (e) => e.subjectId === subject.id
      ).length;

      return {
        ...subject,
        enrollmentCount,
      };
    });

    return subjects.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
  };

  const handleExport = () => {
    alert(
      "Chức năng xuất báo cáo sẽ được triển khai trong phiên bản tiếp theo!"
    );
  };

  const getClassName = (classId) => {
    const cls = MOCK_CLASSES.find((c) => c.id === classId);
    return cls ? cls.name : "N/A";
  };

  const getDepartmentName = (deptId) => {
    const dept = MOCK_DEPARTMENTS.find((d) => d.id === deptId);
    return dept ? dept.name : "N/A";
  };

  const dashboardStats = getDashboardStats();
  const studentReport = getStudentReport();
  const gradeStats = getGradeReport();
  const enrollmentReport = getEnrollmentReport();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Báo cáo & Thống kê</h1>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <button
            onClick={() => setReportType("dashboard")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
              reportType === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </button>
          <button
            onClick={() => setReportType("students")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
              reportType === "students"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Users size={20} />
            <span>Báo cáo sinh viên</span>
          </button>
          <button
            onClick={() => setReportType("grades")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
              reportType === "grades"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <GraduationCap size={20} />
            <span>Thống kê điểm</span>
          </button>
          <button
            onClick={() => setReportType("enrollment")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
              reportType === "enrollment"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <BookOpen size={20} />
            <span>Thống kê đăng ký</span>
          </button>
        </div>
      </div>

      {/* Dashboard View */}
      {reportType === "dashboard" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Tổng Sinh viên</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{dashboardStats.totalStudents}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Tổng Lớp học</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{dashboardStats.totalClasses}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <LayoutDashboard className="text-green-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Tổng Môn học</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{dashboardStats.totalSubjects}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <BookOpen className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Điểm TB Toàn trường</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{dashboardStats.avgGPA}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <GraduationCap className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Distribution Chart Preview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Phân bố học lực</h3>
              <div className="space-y-4">
                {[
                  { label: "Xuất sắc", count: gradeStats.excellent, color: "purple" },
                  { label: "Giỏi", count: gradeStats.good, color: "blue" },
                  { label: "Khá", count: gradeStats.fair, color: "green" },
                  { label: "Trung bình", count: gradeStats.average, color: "yellow" },
                  { label: "Yếu", count: gradeStats.poor, color: "red" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm font-medium text-gray-700">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-${item.color}-600 h-2 rounded-full`}
                        style={{ width: `${(item.count / MOCK_GRADES.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Enrolled Subjects Preview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Môn học phổ biến nhất</h3>
              <div className="space-y-4">
                {enrollmentReport.slice(0, 5).map((subject) => (
                  <div key={subject.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                      <span className="text-sm font-medium text-gray-700">{subject.enrollmentCount} SV</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(subject.enrollmentCount / MOCK_STUDENTS.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Report */}
      {reportType === "students" && (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lọc theo lớp
                </label>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả lớp</option>
                  {MOCK_CLASSES.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lọc theo khoa
                </label>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả khoa</option>
                  {MOCK_DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mã SV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Họ tên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Lớp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Khoa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Số môn đăng ký
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Điểm TB
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentReport.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.studentCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getClassName(student.classId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getDepartmentName(student.departmentId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.enrollmentCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {student.avgGrade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grade Statistics */}
      {reportType === "grades" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm text-purple-600 font-medium">
                Xuất sắc (≥9)
              </p>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {gradeStats.excellent}
              </p>
              <p className="text-sm text-purple-600 mt-1">
                {((gradeStats.excellent / MOCK_GRADES.length) * 100).toFixed(1)}
                %
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-600 font-medium">Giỏi (8-9)</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {gradeStats.good}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                {((gradeStats.good / MOCK_GRADES.length) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-green-600 font-medium">Khá (7-8)</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {gradeStats.fair}
              </p>
              <p className="text-sm text-green-600 mt-1">
                {((gradeStats.fair / MOCK_GRADES.length) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-yellow-600 font-medium">TB (5-7)</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">
                {gradeStats.average}
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                {((gradeStats.average / MOCK_GRADES.length) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <p className="text-sm text-red-600 font-medium">Yếu (&lt;5)</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {gradeStats.poor}
              </p>
              <p className="text-sm text-red-600 mt-1">
                {((gradeStats.poor / MOCK_GRADES.length) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Biểu đồ phân bố điểm
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "Xuất sắc",
                  count: gradeStats.excellent,
                  color: "purple",
                },
                { label: "Giỏi", count: gradeStats.good, color: "blue" },
                { label: "Khá", count: gradeStats.fair, color: "green" },
                {
                  label: "Trung bình",
                  count: gradeStats.average,
                  color: "yellow",
                },
                { label: "Yếu", count: gradeStats.poor, color: "red" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {item.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`bg-${item.color}-600 h-3 rounded-full`}
                      style={{
                        width: `${(item.count / MOCK_GRADES.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Report */}
      {reportType === "enrollment" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mã MH
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tên môn học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Số tín chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Số SV đăng ký
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mức độ phổ biến
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollmentReport.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subject.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {subject.enrollmentCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (subject.enrollmentCount / MOCK_STUDENTS.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
