import { render, screen, act, renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import { MOCK_USERS } from "../data/mockData";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("AuthContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  test("should provide initial state (not authenticated)", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  test("should login successfully as admin", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const response = result.current.login("admin", "admin123");
      expect(response.success).toBe(true);
    });

    expect(result.current.user.username).toBe("admin");
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isAdmin).toBe(true);
    expect(window.localStorage.getItem("user")).toContain("admin");
  });

  test("should login successfully as student", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const response = result.current.login("student", "student123");
      expect(response.success).toBe(true);
    });

    expect(result.current.user.username).toBe("student");
    expect(result.current.isStudent).toBe(true);
  });

  test("should fail login with wrong password", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const response = result.current.login("admin", "wrongpassword");
      expect(response.success).toBe(false);
      expect(response.message).toBe("Tên đăng nhập hoặc mật khẩu không đúng");
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  test("should logout successfully", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Login first
    act(() => {
      result.current.login("admin", "admin123");
    });
    expect(result.current.isAuthenticated).toBe(true);

    // Logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(window.localStorage.getItem("user")).toBeNull();
  });

  test("should restore session from localStorage", () => {
    const user = { username: "admin", role: "admin" };
    window.localStorage.setItem("user", JSON.stringify(user));

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Wait for useEffect to run (though in this mock env it might be sync, 
    // but good practice to check final state)
    expect(result.current.user).toEqual(user);
    expect(result.current.isAuthenticated).toBe(true);
  });
});
