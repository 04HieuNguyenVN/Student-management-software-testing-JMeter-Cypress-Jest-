import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Download } from "lucide-react";
import {
  MOCK_STUDENTS,
  MOCK_CLASSES,
  MOCK_DEPARTMENTS,
} from "../data/mockData";
import { exportToCSV } from "../utils/helpers";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState({
    studentCode: "",
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "Nam",
    address: "",
    classId: "",
    departmentId: "",
    status: "active",
  });

  useEffect(() => {
    setStudents(MOCK_STUDENTS);
  }, []);

  const handleSearch = () => {
    let filtered = [...MOCK_STUDENTS];

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.studentCode
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterClass) {
      filtered = filtered.filter(
        (student) => student.classId === parseInt(filterClass)
      );
    }

    if (filterDepartment) {
      filtered = filtered.filter(
        (student) => student.departmentId === parseInt(filterDepartment)
      );
    }

    setStudents(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterClass("");
    setFilterDepartment("");
    setStudents(MOCK_STUDENTS);
  };

  const handleAddNew = () => {
    setCurrentStudent(null);
    setFormData({
      studentCode: "",
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "Nam",
      address: "",
      classId: "",
      departmentId: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      setStudents(students.filter((s) => s.id !== id));
      alert("Đã xóa sinh viên thành công!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.studentCode || !formData.fullName || !formData.email) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    if (currentStudent) {
      // Update
      setStudents(
        students.map((s) =>
          s.id === currentStudent.id ? { ...formData, id: s.id } : s
        )
      );
      alert("Cập nhật sinh viên thành công!");
    } else {
      // Create
      const newStudent = {
        ...formData,
        id: students.length + 1,
      };
      setStudents([...students, newStudent]);
      alert("Thêm sinh viên thành công!");
    }

    setShowModal(false);
  };

  const getClassName = (classId) => {
    const cls = MOCK_CLASSES.find((c) => c.id === classId);
    return cls ? cls.name : "N/A";
  };

  const getDepartmentName = (deptId) => {
    const dept = MOCK_DEPARTMENTS.find((d) => d.id === deptId);
    return dept ? dept.name : "N/A";
  };

  const handleExport = () => {
    const dataToExport = students.map((s) => ({
      "Mã SV": s.studentCode,
      "Họ tên": s.fullName,
      Email: s.email,
      "Số điện thoại": s.phone,
      "Ngày sinh": s.dateOfBirth,
      "Giới tính": s.gender,
      "Địa chỉ": s.address,
      Lớp: getClassName(s.classId),
      Khoa: getDepartmentName(s.departmentId),
      "Trạng thái": s.status === "active" ? "Đang học" : "Ngưng học",
    }));
    exportToCSV(dataToExport, "danh_sach_sinh_vien.csv");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý sinh viên</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Download size={20} />
            <span>Xuất CSV</span>
          </button>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Thêm sinh viên</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tên, mã SV, email..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lớp
            </label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              {MOCK_CLASSES.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khoa
            </label>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              {MOCK_DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end space-x-2">
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Search size={20} />
              <span>Tìm</span>
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
                Mã SV
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lớp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khoa
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
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.studentCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getClassName(student.classId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getDepartmentName(student.departmentId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.status === "active" ? "Đang học" : "Ngưng học"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Sửa"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {currentStudent
                ? "Sửa thông tin sinh viên"
                : "Thêm sinh viên mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã sinh viên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.studentCode}
                    onChange={(e) =>
                      setFormData({ ...formData, studentCode: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    name="studentCode"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    name="fullName"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    name="email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    name="phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    name="dateOfBirth"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới tính
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    name="gender"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
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
                    Lớp
                  </label>
                  <select
                    value={formData.classId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        classId: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    name="classId"
                  >
                    <option value="">Chọn lớp</option>
                    {MOCK_CLASSES.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    name="address"
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
                  {currentStudent ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
