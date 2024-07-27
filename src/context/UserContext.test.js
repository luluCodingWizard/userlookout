// src/context/UserContext.test.js
import React, { act } from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import axiosMock from "axios-mock-adapter";
import { UserProvider, UserContext } from "./UserContext";

const mock = new axiosMock(axios);

describe("UserContext", () => {
  it("provides the initial state", () => {
    let testContext;
    render(
      <UserProvider>
        <UserContext.Consumer>
          {(context) => {
            testContext = context;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );
    expect(testContext.state.username).toBe("");
    expect(testContext.state.user).toBe(null);
    expect(testContext.state.error).toBe("");
    expect(testContext.state.loading).toBe(false);
  });
  it("sets username correctly", () => {
    let testContext;
    render(
      <UserProvider>
        <UserContext.Consumer>
          {(context) => {
            testContext = context;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );
    act(() => {
      testContext.setUsername("testuser");
    });
    expect(testContext.state.username).toBe("testuser");
  });
  it("handles user search correctly", async () => {
    let testContext;
    render(
      <UserProvider>
        <UserContext.Consumer>
          {(context) => {
            testContext = context;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );
    act(async () => {
      testContext.setUsername("octocat");
      mock
        .onGet("https://api.github.com/users/octocat")
        .reply(200, { login: "octocat" });
      await testContext.searchUser();
      await waitFor(() => expect(testContext.state.user.login).toBe("octocat"));
    });
  });
});
