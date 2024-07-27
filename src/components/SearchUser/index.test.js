import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import axiosMock from "axios-mock-adapter";
import { UserProvider } from "../../context/UserContext";
import SearchUser from "./index";

const mock = new axiosMock(axios);
describe("SearchUser Component", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByRole } = render(
      <UserProvider>
        <SearchUser />
      </UserProvider>
    );
    expect(getByPlaceholderText("Enter GitHub username")).toBeInTheDocument();
    expect(getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("shows error when username is empty", async () => {
    const { getByRole, findByText } = render(
      <UserProvider>
        <SearchUser />
      </UserProvider>
    );
    fireEvent.click(getByRole("button", { name: /search/i }));
    expect(await findByText("Please enter a username")).toBeInTheDocument();
  });

  it("searches for a user successfully", async () => {
    const { getByPlaceholderText, getByRole } = render(
      <UserProvider>
        <SearchUser />
      </UserProvider>
    );
    const input = getByPlaceholderText("Enter GitHub username");
    fireEvent.change(input, { target: { value: "octocat" } });
    mock
      .onGet("https://api.github.com/users/octocat")
      .reply(200, { login: "octocat" });
    fireEvent.click(getByRole("button", { name: /search/i }));
    await waitFor(() => expect(mock.history.get.length).toBe(1));
  });

  it("shows error for nonexistent user", async () => {
    const { getByPlaceholderText, getByRole, findByText } = render(
      <UserProvider>
        <SearchUser />
      </UserProvider>
    );
    const input = getByPlaceholderText("Enter GitHub username");
    fireEvent.change(input, { target: { value: "nonexistentuser" } });
    mock.onGet("https://api.github.com/users/nonexistentuser").reply(404);
    fireEvent.click(getByRole("button", { name: /search/i }));
    expect(await findByText("No Results")).toBeInTheDocument();
  });
});
