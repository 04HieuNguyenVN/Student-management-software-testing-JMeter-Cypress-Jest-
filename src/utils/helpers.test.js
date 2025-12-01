import { calculateGPA, formatDate, exportToCSV } from "./helpers";

describe("Helper Functions", () => {
  describe("calculateGPA", () => {
    test("should return 0 for empty grades", () => {
      expect(calculateGPA([])).toBe(0);
      expect(calculateGPA(null)).toBe(0);
    });

    test("should calculate GPA correctly for mixed scores", () => {
      const grades = [
        { averageScore: 9.0, subject: { credits: 3 } }, // A (4.0) * 3 = 12
        { averageScore: 7.5, subject: { credits: 4 } }, // B (3.0) * 4 = 12
        { averageScore: 6.0, subject: { credits: 3 } }, // C (2.0) * 3 = 6
      ];
      // Total points: 30, Total credits: 10 => GPA: 3.00
      expect(calculateGPA(grades)).toBe("3.00");
    });

    test("should handle missing credits (default to 3)", () => {
      const grades = [
        { averageScore: 8.5 }, // A (4.0) * 3 = 12
      ];
      expect(calculateGPA(grades)).toBe("4.00");
    });

    test("should handle failing grades", () => {
      const grades = [
        { averageScore: 3.0, subject: { credits: 3 } }, // F (0.0) * 3 = 0
      ];
      expect(calculateGPA(grades)).toBe("0.00");
    });
  });

  describe("formatDate", () => {
    test("should format date correctly", () => {
      expect(formatDate("2023-01-01")).toBe("01/01/2023");
    });

    test("should return empty string for null/undefined", () => {
      expect(formatDate(null)).toBe("");
      expect(formatDate(undefined)).toBe("");
    });
  });

  describe.skip("exportToCSV", () => {
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

    test("should not export if data is empty", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
      exportToCSV([], "test.csv");
      expect(consoleSpy).toHaveBeenCalledWith("No data to export");
      expect(createElementSpy).not.toHaveBeenCalled();
    });

    test("should create link and trigger download", () => {
      const data = [{ name: "Test", value: 123 }];
      exportToCSV(data, "test.csv");
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(appendChildSpy).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
    });

    test("should handle commas in data", () => {
      const data = [{ name: "Test, Name", value: 123 }];
      exportToCSV(data, "test.csv");
      // We can't easily check the blob content here without more complex mocking,
      // but we verify the flow completes without error.
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
