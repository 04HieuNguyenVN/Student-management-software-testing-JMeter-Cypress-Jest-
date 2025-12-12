import { render, screen } from "@testing-library/react";
import React from "react";
import Courses from "./Courses";

describe("Kiểm thử Trang Môn học (Courses)", () => {
  test(" hiển thị tiêu đề trang Môn học", () => {
    render(<Courses />);
    const heading = screen.getByRole("heading", { name: /môn học/i });
    expect(heading).toBeInTheDocument();
  });
});
