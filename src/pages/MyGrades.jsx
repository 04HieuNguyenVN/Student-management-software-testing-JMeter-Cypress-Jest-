import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { BarChart3, TrendingUp, Award } from "lucide-react";
import { MOCK_GRADES, MOCK_STUDENTS, MOCK_SUBJECTS } from "../data/mockData";

const MyGrades = () => {
  const { user } = useAuth();
  const [studentInfo, setStudentInfo] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // Find current student info - match by username with studentCode
    const student = MOCK_STUDENTS.find(
      (s) =>
        s.studentCode?.toLowerCase() === user?.username.toLowerCase() ||
        s.username?.toLowerCase() === user?.username.toLowerCase()
    );
    setStudentInfo(student);

    // Get grades for this student
    if (student) {
      const studentGrades = MOCK_GRADES.filter(
        (g) => g.studentId === student.id
      );
      setGrades(studentGrades);
    }
  }, [user]);

  const getSubjectInfo = (subjectId) => {
    const subject = MOCK_SUBJECTS.find((s) => s.id === subjectId);
    return subject || { name: "N/A", code: "N/A", credits: 0 };
  };

  const calculateGPA = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade.averageScore, 0);
    return (total / grades.length).toFixed(2);
  };

  const getTotalCredits = () => {
    return grades.reduce((sum, grade) => {
      const subject = getSubjectInfo(grade.subjectId);
      return sum + subject.credits;
    }, 0);
  };

  const getGradeDistribution = () => {
    return {
      excellent: grades.filter((g) => g.averageScore >= 9).length,
      good: grades.filter((g) => g.averageScore >= 8 && g.averageScore < 9)
        .length,
      fair: grades.filter((g) => g.averageScore >= 7 && g.averageScore < 8)
        .length,
      average: grades.filter((g) => g.averageScore >= 5 && g.averageScore < 7)
        .length,
      poor: grades.filter((g) => g.averageScore < 5).length,
    };
  };

  const getGradeLabel = (score) => {
    if (score >= 9)
      return { label: "Xuất sắc", class: "bg-purple-100 text-purple-800" };
    if (score >= 8)
      return { label: "Giỏi", class: "bg-blue-100 text-blue-800" };
    if (score >= 7)
      return { label: "Khá", class: "bg-green-100 text-green-800" };
    if (score >= 5)
      return { label: "Trung bình", class: "bg-yellow-100 text-yellow-800" };
    return { label: "Yếu", class: "bg-red-100 text-red-800" };
  };

  const distribution = getGradeDistribution();
  const gpa = calculateGPA();
  const totalCredits = getTotalCredits();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Kết quả học tập của tôi
      </h1>

      {/* Student Info Card */}
      {studentInfo && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{studentInfo.fullName}</h2>
              <p className="text-blue-100 mt-1">
                Mã SV: {studentInfo.studentCode}
              </p>
              <p className="text-blue-100">Email: {studentInfo.email}</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
                <p className="text-sm opacity-90">GPA</p>
                <p className="text-4xl font-bold">{gpa}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tổng số môn</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {grades.length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="text-blue-600" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tổng tín chỉ</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {totalCredits}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="text-green-600" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Điểm TB</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{gpa}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="text-purple-600" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Phân bố kết quả
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <p className="text-sm text-purple-600 font-medium">Xuất sắc</p>
            <p className="text-2xl font-bold text-purple-900 mt-1">
              {distribution.excellent}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-600 font-medium">Giỏi</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">
              {distribution.good}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-sm text-green-600 font-medium">Khá</p>
            <p className="text-2xl font-bold text-green-900 mt-1">
              {distribution.fair}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-sm text-yellow-600 font-medium">Trung bình</p>
            <p className="text-2xl font-bold text-yellow-900 mt-1">
              {distribution.average}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-sm text-red-600 font-medium">Yếu</p>
            <p className="text-2xl font-bold text-red-900 mt-1">
              {distribution.poor}
            </p>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">
            Bảng điểm chi tiết
          </h3>
        </div>
        {grades.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Môn học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã môn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số TC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm GK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm CK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm TB
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Xếp loại
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade) => {
                const subject = getSubjectInfo(grade.subjectId);
                const gradeInfo = getGradeLabel(grade.averageScore);
                return (
                  <tr key={grade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {subject.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {subject.credits}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {grade.midtermScore}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {grade.finalScore}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {grade.averageScore}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${gradeInfo.class}`}
                      >
                        {gradeInfo.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">Chưa có dữ liệu điểm</p>
          </div>
        )}
      </div>

      {/* Academic Performance Note */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Ghi chú</h4>
        <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
          <li>Điểm TB = Điểm GK × 30% + Điểm CK × 70%</li>
          <li>
            Xếp loại: Xuất sắc (≥9), Giỏi (8-9), Khá (7-8), TB (5-7), Yếu
            (&lt;5)
          </li>
          <li>GPA được tính trung bình từ tất cả các môn đã học</li>
        </ul>
      </div>
    </div>
  );
};

export default MyGrades;
