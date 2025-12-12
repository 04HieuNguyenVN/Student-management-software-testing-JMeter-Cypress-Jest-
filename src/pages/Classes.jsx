import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { MOCK_CLASSES, MOCK_DEPARTMENTS } from "../data/mockData";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    departmentId: "",
    academicYear: "",
    capacity: 40,
  });

  useEffect(() => {
    setClasses(MOCK_CLASSES);
  }, []);

  const handleAddNew = () => {
    setCurrentClass(null);
    setFormData({
      name: "",
      code: "",
      departmentId: "",
      academicYear: "",
      capacity: 40,
    });
    setShowModal(true);
  };

  const handleEdit = (cls) => {
    setCurrentClass(cls);
    setFormData(cls);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lớp học này?")) {
      setClasses(classes.filter((c) => c.id !== id));
      alert("Đã xóa lớp học thành công!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.code) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    if (currentClass) {
      setClasses(
        classes.map((c) =>
          c.id === currentClass.id ? { ...formData, id: c.id } : c
        )
      );
      alert("Cập nhật lớp học thành công!");
    } else {
      const newClass = {
        ...formData,
        id: classes.length + 1,
      };
      setClasses([...classes, newClass]);
      alert("Thêm lớp học thành công!");
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
        <h1 className="text-3xl font-bold text-gray-800">Quản lý lớp học</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Thêm lớp học</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {cls.name}
                  </h3>
                  <p className="text-sm text-gray-500">{cls.code}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Khoa:</span>
                <span className="font-semibold">
                  {getDepartmentName(cls.departmentId)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Năm học:</span>
                <span className="font-semibold">{cls.academicYear}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sĩ số:</span>
                <span className="font-semibold">{cls.capacity} sinh viên</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t">
              <button
                onClick={() => handleEdit(cls)}
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                <Edit size={16} />
                <span>Sửa</span>
              </button>
              <button
                onClick={() => handleDelete(cls.id)}
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
              {currentClass ? "Sửa thông tin lớp học" : "Thêm lớp học mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã lớp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    name="code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên lớp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    name="className"
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
                    name="departmentId"
                  >
                    <option value="">Chọn khoa</option>
                    {MOCK_DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Năm học
                  </label>
                  <input
                    type="text"
                    value={formData.academicYear}
                    onChange={(e) =>
                      setFormData({ ...formData, academicYear: e.target.value })
                    }
                    placeholder="VD: 2023-2024"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    name="academicYear"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sĩ số
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    name="capacity"
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
                  {currentClass ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
