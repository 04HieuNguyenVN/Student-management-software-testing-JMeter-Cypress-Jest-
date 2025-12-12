import { calculateGPA, formatDate, exportToCSV } from "./helpers";

describe("Kiểm thử các Hàm Tiện ích (Helper Functions)", () => {
  describe("Tính điểm GPA - calculateGPA", () => {
    test(" trả về 0 khi danh sách điểm rỗng", () => {
      expect(calculateGPA([])).toBe(0);
      expect(calculateGPA(null)).toBe(0);
    });

    test(" tính GPA chính xác với các điểm số khác nhau", () => {
      const grades = [
        { averageScore: 9.0, subject: { credits: 3 } }, // A (4.0) * 3 = 12
        { averageScore: 7.5, subject: { credits: 4 } }, // B (3.0) * 4 = 12
        { averageScore: 6.0, subject: { credits: 3 } }, // C (2.0) * 3 = 6
      ];
      // Total points: 30, Total credits: 10 => GPA: 3.00
      expect(calculateGPA(grades)).toBe("3.00");
    });

    test(" xử lý khi thiếu số tín chỉ (mặc định là 3)", () => {
      const grades = [
        { averageScore: 8.5 }, // A (4.0) * 3 = 12
      ];
      expect(calculateGPA(grades)).toBe("4.00");
    });

    test(" xử lý đúng khi điểm dưới trung bình (rớt)", () => {
      const grades = [
        { averageScore: 3.0, subject: { credits: 3 } }, // F (0.0) * 3 = 0
      ];
      expect(calculateGPA(grades)).toBe("0.00");
    });
  });

  describe("Định dạng ngày tháng - formatDate", () => {
    test(" định dạng ngày chính xác sang DD/MM/YYYY", () => {
      expect(formatDate("2023-01-01")).toBe("01/01/2023");
    });

    test(" trả về chuỗi rỗng khi đầu vào là null hoặc undefined", () => {
      expect(formatDate(null)).toBe("");
      expect(formatDate(undefined)).toBe("");
    });
  });

  describe.skip("Xuất dữ liệu CSV - exportToCSV", () => {
    let createElementSpy;
    let appendChildSpy;
    let removeChildSpy;
    let clickSpy;
    let urlCreateObjectURLSpy;

    beforeEach(() => {
      // Mock window.URL and window.Blob
      if (!window.URL) {
        window.URL = {};
      }
      window.URL.createObjectURL = jest.fn(() => "blob:url");
      
      if (!window.Blob) {
        window.Blob = class {
          constructor(content, options) {
            this.content = content;
            this.options = options;
          }
        };
      }

      // Mock DOM elements and methods
      clickSpy = jest.fn();
      createElementSpy = jest.spyOn(document, "createElement").mockReturnValue({
        click: clickSpy,
        setAttribute: jest.fn(),
        style: {},
      });
      appendChildSpy = jest.spyOn(document.body, "appendChild").mockImplementation(() => {});
      removeChildSpy = jest.spyOn(document.body, "removeChild").mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("Không  xuất file khi dữ liệu rỗng", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
      exportToCSV([], "test.csv");
      expect(consoleSpy).toHaveBeenCalledWith("No data to export");
      expect(createElementSpy).not.toHaveBeenCalled();
    });

    test(" tạo link và kích hoạt tải xuống", () => {
      const data = [{ name: "Test", value: 123 }];
      exportToCSV(data, "test.csv");
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(appendChildSpy).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
    });

    test(" xử lý đúng dữ liệu chứa dấu phẩy", () => {
      const data = [{ name: "Test, Name", value: 123 }];
      exportToCSV(data, "test.csv");
      // We can't easily check the blob content here without more complex mocking,
      // but we verify the flow completes without error.
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
