import { useState } from "react";
import { Save, User, Lock, Bell, Globe, Moon } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Hệ thống Quản lý Sinh viên",
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    systemAlerts: true,

    // Academic Settings
    academicYear: "2023-2024",
    currentSemester: "1",
    maxCreditsPerSemester: 24,
    passingGrade: 5.0,

    // Display Settings
    itemsPerPage: 20,
    dateFormat: "DD/MM/YYYY",
    darkMode: false,
  });

  const [activeTab, setActiveTab] = useState("general");

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    alert("Đã lưu cài đặt thành công!");
    console.log("Settings saved:", settings);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Cài đặt hệ thống</h1>
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Lưu thay đổi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("general")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === "general"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Globe size={20} />
                <span>Chung</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === "notifications"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Bell size={20} />
                <span>Thông báo</span>
              </button>
              <button
                onClick={() => setActiveTab("academic")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === "academic"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <User size={20} />
                <span>Học vụ</span>
              </button>
              <button
                onClick={() => setActiveTab("display")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === "display"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Moon size={20} />
                <span>Hiển thị</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === "security"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Lock size={20} />
                <span>Bảo mật</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cài đặt chung</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên hệ thống
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => handleChange("siteName", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngôn ngữ
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleChange("language", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Múi giờ
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleChange("timezone", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Asia/Ho_Chi_Minh">
                        (GMT+7) Hồ Chí Minh
                      </option>
                      <option value="Asia/Bangkok">(GMT+7) Bangkok</option>
                      <option value="Asia/Singapore">(GMT+8) Singapore</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cài đặt thông báo</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Email thông báo</p>
                      <p className="text-sm text-gray-500">
                        Nhận thông báo qua email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) =>
                          handleChange("emailNotifications", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">SMS thông báo</p>
                      <p className="text-sm text-gray-500">
                        Nhận thông báo qua tin nhắn
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) =>
                          handleChange("smsNotifications", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Cảnh báo hệ thống</p>
                      <p className="text-sm text-gray-500">
                        Thông báo về bảo trì và cập nhật
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.systemAlerts}
                        onChange={(e) =>
                          handleChange("systemAlerts", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Academic Settings */}
            {activeTab === "academic" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cài đặt học vụ</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Năm học hiện tại
                      </label>
                      <input
                        type="text"
                        value={settings.academicYear}
                        onChange={(e) =>
                          handleChange("academicYear", e.target.value)
                        }
                        placeholder="VD: 2023-2024"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Học kỳ hiện tại
                      </label>
                      <select
                        value={settings.currentSemester}
                        onChange={(e) =>
                          handleChange("currentSemester", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">Học kỳ 1</option>
                        <option value="2">Học kỳ 2</option>
                        <option value="3">Học kỳ 3 (Hè)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số tín chỉ tối đa/học kỳ
                    </label>
                    <input
                      type="number"
                      value={settings.maxCreditsPerSemester}
                      onChange={(e) =>
                        handleChange(
                          "maxCreditsPerSemester",
                          parseInt(e.target.value)
                        )
                      }
                      min="12"
                      max="30"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Điểm đạt tối thiểu
                    </label>
                    <input
                      type="number"
                      value={settings.passingGrade}
                      onChange={(e) =>
                        handleChange("passingGrade", parseFloat(e.target.value))
                      }
                      min="0"
                      max="10"
                      step="0.1"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Display Settings */}
            {activeTab === "display" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cài đặt hiển thị</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số mục/trang
                    </label>
                    <select
                      value={settings.itemsPerPage}
                      onChange={(e) =>
                        handleChange("itemsPerPage", parseInt(e.target.value))
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Định dạng ngày
                    </label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) =>
                        handleChange("dateFormat", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Chế độ tối</p>
                      <p className="text-sm text-gray-500">
                        Giao diện tối giúp bảo vệ mắt
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.darkMode}
                        onChange={(e) =>
                          handleChange("darkMode", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cài đặt bảo mật</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Lưu ý:</strong> Các cài đặt bảo mật sẽ được triển
                      khai trong phiên bản tiếp theo. Hiện tại hệ thống sử dụng
                      authentication cơ bản.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Chính sách mật khẩu</h3>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                      <li>Độ dài tối thiểu: 8 ký tự</li>
                      <li>Yêu cầu ký tự đặc biệt: Không</li>
                      <li>Thời gian hết hạn: 90 ngày</li>
                      <li>Số lần đăng nhập sai tối đa: 5</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Phiên đăng nhập</h3>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                      <li>Thời gian timeout: 30 phút không hoạt động</li>
                      <li>Cho phép đăng nhập đa thiết bị: Có</li>
                      <li>Ghi nhớ đăng nhập: 7 ngày</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
