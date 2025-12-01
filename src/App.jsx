import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Classes from "./pages/Classes";
import Grades from "./pages/Grades";
import Enrollment from "./pages/Enrollment";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import MyGrades from "./pages/MyGrades";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route
                      path="/students"
                      element={
                        <PrivateRoute allowedRoles={["admin", "teacher"]}>
                          <Students />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/courses"
                      element={
                        <PrivateRoute allowedRoles={["admin", "teacher"]}>
                          <Courses />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/classes"
                      element={
                        <PrivateRoute allowedRoles={["admin", "teacher"]}>
                          <Classes />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/grades"
                      element={
                        <PrivateRoute allowedRoles={["admin", "teacher"]}>
                          <Grades />
                        </PrivateRoute>
                      }
                    />

                    <Route path="/enrollment" element={<Enrollment />} />

                    <Route
                      path="/reports"
                      element={
                        <PrivateRoute allowedRoles={["admin", "teacher"]}>
                          <Reports />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/subjects"
                      element={
                        <PrivateRoute allowedRoles={["admin", "teacher"]}>
                          <Courses />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/settings"
                      element={
                        <PrivateRoute allowedRoles={["admin"]}>
                          <Settings />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/my-grades"
                      element={
                        <PrivateRoute allowedRoles={["student"]}>
                          <MyGrades />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
