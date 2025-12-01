import { useState, useEffect } from "react";
import { Edit, Save, Calculator, Download } from "lucide-react";
import { MOCK_GRADES, MOCK_STUDENTS, MOCK_SUBJECTS } from "../data/mockData";
import { exportToCSV } from "../utils/helpers";

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    setGrades(MOCK_GRADES);
  }, []);

  const handleFilter = () => {
    let filtered = [...MOCK_GRADES];

    if (selectedStudent) {
      filtered = filtered.filter(
        (g) => g.studentId === parseInt(selectedStudent)
      );
    }

    if (selectedSubject) {
      filtered = filtered.filter(
        (g) => g.subjectId === parseInt(selectedSubject)
      );
    }

    setGrades(filtered);
  };

  const handleReset = () => {
    setSelectedStudent("");
    setSelectedSubject("");
    setGrades(MOCK_GRADES);
  };

  const handleEdit = (grade) => {
    setEditingId(grade.id);
    setEditData({
      midtermScore: grade.midtermScore,
      finalScore: grade.finalScore,
    });
  };

  const handleSave = (id) => {
    const updatedGrades = grades.map((g) => {
      if (g.id === id) {
        const midterm = parseFloat(editData.midtermScore) || 0;
        const final = parseFloat(editData.finalScore) || 0;
        const average = (midterm * 0.3 + final * 0.7).toFixed(2);

        return {
          ...g,
          midtermScore: midterm,
          finalScore: final,
          averageScore: parseFloat(average),
        };
      }
      return g;
    });

    setGrades(updatedGrades);
    setEditingId(null);
    alert("Cập nhật điểm thành công!");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const getStudentName = (studentId) => {
    const student = MOCK_STUDENTS.find((s) => s.id === studentId);
    return student ? student.fullName : "N/A";
  };

  const getSubjectName = (subjectId) => {
    const subject = MOCK_SUBJECTS.find((s) => s.id === subjectId);
    return subject ? subject.name : "N/A";
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

  const handleExport = () => {
    const dataToExport = grades.map((g) => ({
      "Sinh viên": getStudentName(g.studentId),
      "Môn học": getSubjectName(g.subjectId),
      "Điểm GK": g.midtermScore,
      "Điểm CK": g.finalScore,
      "Điểm TB": g.averageScore,
      "Xếp loại": getGradeLabel(g.averageScore).label,
    }));
    exportToCSV(dataToExport, "bang_diem.csv");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý điểm</h1>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Xuất CSV</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sinh viên
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
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
              Môn học
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả môn học</option>
              {MOCK_SUBJECTS.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end space-x-2">
            <button
              onClick={handleFilter}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Calculator size={20} />
              <span>Lọc</span>
            </button>
            <button
              onClick={handleReset}
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
                Điểm giữa kỳ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm cuối kỳ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm TB
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Xếp loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {grades.map((grade) => {
              const gradeInfo = getGradeLabel(grade.averageScore);
              const isEditing = editingId === grade.id;

              return (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getStudentName(grade.studentId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getSubjectName(grade.subjectId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={editData.midtermScore}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            midtermScore: e.target.value,
                          })
                        }
                        className="w-20 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      grade.midtermScore
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={editData.finalScore}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            finalScore: e.target.value,
                          })
                        }
                        className="w-20 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      grade.finalScore
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {grade.averageScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${gradeInfo.class}`}
                    >
                      {gradeInfo.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave(grade.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Lưu"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-900"
                          title="Hủy"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(grade)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Sửa"
                      >
                        <Edit size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Xuất sắc</p>
          <p className="text-2xl font-bold text-purple-900">
            {grades.filter((g) => g.averageScore >= 9).length}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Giỏi</p>
          <p className="text-2xl font-bold text-blue-900">
            {
              grades.filter((g) => g.averageScore >= 8 && g.averageScore < 9)
                .length
            }
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Khá</p>
          <p className="text-2xl font-bold text-green-900">
            {
              grades.filter((g) => g.averageScore >= 7 && g.averageScore < 8)
                .length
            }
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">
            Trung bình & Yếu
          </p>
          <p className="text-2xl font-bold text-yellow-900">
            {grades.filter((g) => g.averageScore < 7).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Grades;
