import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PropTypes from "prop-types";
import {
  Home,
  Users,
  BookOpen,
  GraduationCap,
  BarChart3,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getMenuItems = () => {
    const commonItems = [
      { path: "/dashboard", label: "Trang chủ", icon: Home },
    ];

    if (user?.role === "admin") {
      return [
        ...commonItems,
        // { path: "/students", label: "Quản lý sinh viên", icon: Users },
        { path: "/subjects", label: "Quản lý môn học", icon: BookOpen },
        { path: "/classes", label: "Quản lý lớp học", icon: Users },
        { path: "/grades", label: "Quản lý điểm", icon: GraduationCap },
        { path: "/enrollment", label: "Đăng ký học phần", icon: FileText },
        { path: "/reports", label: "Báo cáo & Thống kê", icon: BarChart3 },
        { path: "/settings", label: "Cài đặt", icon: Settings },
      ];
    }

    if (user?.role === "teacher") {
      return [
        ...commonItems,
        { path: "/students", label: "Danh sách sinh viên", icon: Users },
        { path: "/subjects", label: "Môn học", icon: BookOpen },
        { path: "/classes", label: "Lớp học", icon: Users },
        { path: "/grades", label: "Quản lý điểm", icon: GraduationCap },
        { path: "/enrollment", label: "Đăng ký học phần", icon: FileText },
        { path: "/reports", label: "Báo cáo", icon: BarChart3 },
      ];
    }

    if (user?.role === "student") {
      return [
        ...commonItems,
        { path: "/enrollment", label: "Đăng ký học phần", icon: FileText },
        { path: "/my-grades", label: "Xem điểm", icon: GraduationCap },
      ];
    }

    return commonItems;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">SMS System</h1>
          <p className="text-sm text-blue-200">
            {user?.role === "admin" && "Quản trị viên"}
            {user?.role === "teacher" && "Giảng viên"}
            {user?.role === "student" && "Sinh viên"}
          </p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {getMenuItems().map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded transition-colors ${
                      isActive ? "bg-blue-900" : "hover:bg-blue-700"
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Hệ thống Quản lý Sinh viên
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.username}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
