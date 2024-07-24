import { renderHook } from "@testing-library/react";
import { act } from "react";
import useTheme from "./useTheme";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useTheme hook", () => {
  beforeEach(() => {
    // Clear the localStorage before each test
    localStorageMock.clear();
    document.documentElement.className = ""; // Reset className
  });

  test("should initialize with light theme by default", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe("light");
    expect(document.documentElement.className).toBe("light");
  });
  test("should toggle theme from light to dark", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[1](); // Call toggleTheme
    });

    expect(result.current[0]).toBe("dark");
    expect(document.documentElement.className).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
