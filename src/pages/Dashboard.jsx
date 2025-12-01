import { useAuth } from "../contexts/AuthContext";
import { Users, BookOpen, GraduationCap, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Tổng sinh viên",
      value: "500",
      icon: Users,
      color: "bg-blue-500",
      show: ["admin", "teacher"],
    },
    {
      title: "Tổng môn học",
      value: "20",
      icon: BookOpen,
      color: "bg-green-500",
      show: ["admin", "teacher"],
    },
    {
      title: "Tổng lớp học",
      value: "10",
      icon: GraduationCap,
      color: "bg-purple-500",
      show: ["admin", "teacher"],
    },
    {
      title: "Điểm trung bình",
      value: "8.5",
      icon: BarChart3,
      color: "bg-orange-500",
      show: ["student"],
    },
  ];

  const filteredStats = stats.filter((stat) => stat.show.includes(user?.role));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Xin chào, {user?.name}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {filteredStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex items-center"
          >
            <div className={`${stat.color} p-4 rounded-lg mr-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Thông tin hệ thống
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Vai trò:</span>
            <span className="font-medium">
              {user?.role === "admin" && "Quản trị viên"}
              {user?.role === "teacher" && "Giảng viên"}
              {user?.role === "student" && "Sinh viên"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Tên đăng nhập:</span>
            <span className="font-medium">{user?.username}</span>
          </div>
          {user?.role === "student" && (
            <>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Mã sinh viên:</span>
                <span className="font-medium">{user?.studentCode}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Lớp:</span>
                <span className="font-medium">CNTT 01</span>
              </div>
            </>
          )}
        </div>
      </div>

      {user?.role === "admin" && (
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Chú ý:</strong> Đây là ứng dụng demo cho mục đích kiểm
                thử. Tất cả dữ liệu là dữ liệu mẫu và sẽ bị xóa khi tải lại
                trang.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
