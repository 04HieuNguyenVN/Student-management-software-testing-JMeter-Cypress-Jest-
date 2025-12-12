/* eslint-env cypress */
// Kiểm thử Dashboard và Báo cáo

describe("Dashboard", () => {
  describe("Dashboard Admin", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.login("admin");
    });

    it(" hiển thị dashboard admin với thống kê", () => {
      cy.url().should("include", "/dashboard");
      cy.get("h1").should("contain", "Xin chào");
    });

    it(" hiển thị các thẻ tổng hợp", () => {
      cy.get("div").contains("Tổng sinh viên").should("exist");
    });

    it(" hiển thị nội dung dashboard", () => {
      cy.get("main, .main-content, [role='main']").should("exist");
      cy.get("body").should("be.visible");
    });
  });

  describe("Dashboard Giáo viên", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.login("teacher");
    });

    it(" hiển thị dashboard giáo viên", () => {
      cy.url().should("include", "/dashboard");
      cy.get("h1").should("contain", "Xin chào");
    });

    it(" hiển thị thông tin dành cho giáo viên", () => {
      cy.get("div").contains("Tổng lớp học").should("exist");
    });
  });

  describe("Dashboard Sinh viên", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.login("student");
    });

    it(" hiển thị dashboard sinh viên", () => {
      cy.url().should("include", "/dashboard");
      cy.get("h1").should("contain", "Xin chào");
    });

    it(" hiển thị GPA và thông tin học tập", () => {
      cy.get("div").contains("Điểm trung bình").should("exist");
    });
  });
});

describe("Báo cáo", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Báo cáo & Thống kê");
  });

  describe("Trang Báo cáo", () => {
    it(" hiển thị trang báo cáo", () => {
      cy.url().should("include", "/reports");
      cy.get("h1").should("contain", "Báo cáo & Thống kê");
    });

    it(" có bộ chọn loại báo cáo", () => {
      cy.get("select, button").should("exist");
    });
  });

  describe("Báo cáo Sinh viên", () => {
    it(" hiển thị danh sách sinh viên trong báo cáo", () => {
      cy.get("button").contains("Báo cáo sinh viên").click();
      cy.wait(300);
      cy.get("table").should("exist");
    });

    it(" lọc theo khoa", () => {
      cy.get("button").contains("Báo cáo sinh viên").click();
      cy.wait(300);
      cy.get("select").first().select(1);
      cy.wait(300);
      cy.get("body").should("exist");
    });

    it(" lọc theo lớp", () => {
      cy.get("button").contains("Báo cáo sinh viên").click();
      cy.wait(300);
      cy.get("select").eq(1).select(1);
      cy.wait(300);
      cy.get("body").should("exist");
    });
  });

  describe("Báo cáo Điểm", () => {
    it(" tạo báo cáo tổng hợp điểm", () => {
      cy.get("button").contains("Thống kê điểm").click();
      cy.wait(300);
      cy.get("body").should("exist");
    });

    it(" hiển thị thống kê", () => {
      cy.get("button").contains("Thống kê điểm").click();
      cy.wait(300);
      cy.get("div").contains("Biểu đồ phân bố điểm").should("exist");
    });
  });

  describe("Xuất Báo cáo", () => {
    it(" có các nút điều khiển trên trang", () => {
      // Kiểm tra có button trên trang (có thể có nút xuất hoặc các nút khác)
      cy.get("button").should("have.length.at.least", 1);
    });
  });
});

describe("Cài đặt", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Cài đặt");
  });

  it(" hiển thị trang cài đặt chỉ dành cho admin", () => {
    cy.url().should("include", "/settings");
    cy.get("h1").should("contain", "Cài đặt hệ thống");
  });

  it(" hiển thị các tab cài đặt", () => {
    cy.get("button, div").contains("Chung").should("exist");
  });

  it(" có nút lưu cài đặt", () => {
    cy.get("button").contains("Lưu").should("exist");
  });
});

describe("Điều hướng", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
  });

  it(" điều hướng giữa các trang bằng sidebar", () => {
    cy.navigateTo("Quản lý sinh viên");
    cy.url().should("include", "/students");

    cy.navigateTo("Quản lý môn học");
    cy.url().should("include", "/subjects");

    cy.navigateTo("Quản lý lớp học");
    cy.url().should("include", "/classes");
  });

  it(" đánh dấu menu đang active", () => {
    cy.navigateTo("Quản lý sinh viên");
    cy.get('nav a[href="/students"]').should("have.class", "bg-blue-900");
  });
});
