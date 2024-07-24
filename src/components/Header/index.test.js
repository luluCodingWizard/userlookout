import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import useTheme from "../../hooks/useTheme";

// mock the useTheme Hook
jest.mock("../../hooks/useTheme");

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render with light theme initially", () => {
    useTheme.mockReturnValue(["light", jest.fn()]);
    const { getByText, getByRole } = render(<Header />);

    expect(getByText("devfinder")).toBeInTheDocument();
    expect(getByText("Dark")).toBeInTheDocument();
    expect(getByRole("button")).toHaveTextContent("Dark");
  });

  test("should render with dark theme initially", () => {
    useTheme.mockReturnValue(["dark", jest.fn()]);

    const { getByText, getByRole } = render(<Header />);

    expect(getByText("devfinder")).toBeInTheDocument();
    expect(getByText("LIGHT")).toBeInTheDocument();
    expect(getByRole("button")).toHaveTextContent("LIGHT");
  });

  test("should toggle theme on button click", () => {
    const toggleThemeMock = jest.fn();
    useTheme.mockReturnValue(["light", toggleThemeMock]);

    const { getByRole } = render(<Header />);
    const button = getByRole("button");

    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
