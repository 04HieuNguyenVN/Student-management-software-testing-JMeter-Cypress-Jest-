import { render, screen } from "@testing-library/react";
import React from "react";
import Courses from "./Courses";

describe("Courses page", () => {
  test("renders heading", () => {
    render(<Courses />);
    const heading = screen.getByRole("heading", { name: /môn học/i });
    expect(heading).toBeInTheDocument();
  });
});
