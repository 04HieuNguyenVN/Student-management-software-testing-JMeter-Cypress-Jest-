import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { MOCK_SUBJECTS, MOCK_DEPARTMENTS } from "../data/mockData";

const Courses = () => {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: 3,
    departmentId: "",
    description: "",
  });

  useEffect(() => {
    setSubjects(MOCK_SUBJECTS);
  }, []);

  const handleAddNew = () => {
    setCurrentSubject(null);
    setFormData({
      code: "",
      name: "",
      credits: 3,
      departmentId: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleEdit = (subject) => {
    setCurrentSubject(subject);
    setFormData(subject);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa môn học này?")) {
      setSubjects(subjects.filter((s) => s.id !== id));
      alert("Đã xóa môn học thành công!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.code || !formData.name) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    if (currentSubject) {
      setSubjects(
        subjects.map((s) =>
          s.id === currentSubject.id ? { ...formData, id: s.id } : s
        )
      );
      alert("Cập nhật môn học thành công!");
    } else {
      const newSubject = {
        ...formData,
        id: subjects.length + 1,
      };
      setSubjects([...subjects, newSubject]);
      alert("Thêm môn học thành công!");
    }

    setShowModal(false);
  };

  const getDepartmentName = (deptId) => {
    const dept = MOCK_DEPARTMENTS.find((d) => d.id === deptId);
    return dept ? dept.name : "N/A";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý môn học</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Thêm môn học</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-500">{subject.code}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Số tín chỉ:</span>
                <span className="font-semibold">{subject.credits}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Khoa:</span>
                <span className="font-semibold">
                  {getDepartmentName(subject.departmentId)}
                </span>
              </div>
            </div>

            {subject.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {subject.description}
              </p>
            )}

            <div className="flex space-x-2 pt-4 border-t">
              <button
                onClick={() => handleEdit(subject)}
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                <Edit size={16} />
                <span>Sửa</span>
              </button>
              <button
                onClick={() => handleDelete(subject.id)}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Xóa</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">
              {currentSubject ? "Sửa thông tin môn học" : "Thêm môn học mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã môn học <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên môn học <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tín chỉ
                  </label>
                  <input
                    type="number"
                    value={formData.credits}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khoa
                  </label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departmentId: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn khoa</option>
                    {MOCK_DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {currentSubject ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
