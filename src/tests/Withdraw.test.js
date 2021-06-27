import { render, screen } from "@testing-library/react";
import Withdraw from "../withdraw";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import UserContext from "../context";

test("Withdraw page should render (user not logged in )", () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <Withdraw />
    </UserContext.Provider>
  );

  screen.getByText("Withdraw");
  screen.getByText("You are not logged in");
});

test("Withdraw page should render (user logged in )", () => {
  render(
    <UserContext.Provider
      value={{
        users: [],
        currentUser: {
          name: "user1",
          email: "email1@test.com",
          password: "password1",
          balance: 100,
        },
      }}
    >
      <Withdraw />
    </UserContext.Provider>
  );

  screen.getByText("Withdraw", { selector: "div" });
  screen.getByText("Balance $100");
  screen.getByText("Withdraw Amount", { selector: "label" });
  screen.getByLabelText("Withdraw Amount");
  const WithdrawBtn = screen.getByText("Withdraw", { selector: "button" });
  // Withdraw button should be disabled because amount is not provided
  expect(WithdrawBtn).toBeDisabled();
});

test("Withdraw button should be enabled when amount is provided", () => {
  render(
    <UserContext.Provider
      value={{
        users: [],
        currentUser: {
          name: "user1",
          email: "email1@test.com",
          password: "password1",
          balance: 100,
        },
      }}
    >
      <Withdraw />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Withdraw Amount");

  const WithdrawBtn = screen.getByText("Withdraw", { selector: "button" });
  // Withdraw button should be disabled because amount is not provided
  expect(WithdrawBtn).toBeDisabled();
  userEvent.type(input, "5");
  expect(WithdrawBtn).toBeEnabled();
});

test("User can Withdraw money", () => {
  render(
    <UserContext.Provider
      value={{
        users: [],
        currentUser: {
          name: "user1",
          email: "email1@test.com",
          password: "password1",
          balance: 221,
        },
      }}
    >
      <Withdraw />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Withdraw Amount");

  const WithdrawBtn = screen.getByText("Withdraw", { selector: "button" });
  // Withdraw button should be disabled because amount is not provided
  userEvent.type(input, "111");
  userEvent.click(WithdrawBtn);
  screen.getByText("Sucessfully withdrawed");
  screen.getByText("Balance $110");
});

test("Error is shown when Withdraw amount is negative", () => {
  render(
    <UserContext.Provider
      value={{
        users: [],
        currentUser: {
          name: "user1",
          email: "email1@test.com",
          password: "password1",
          balance: 100,
        },
      }}
    >
      <Withdraw />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Withdraw Amount");

  const WithdrawBtn = screen.getByText("Withdraw", { selector: "button" });
  // Withdraw button should be disabled because amount is not provided
  userEvent.type(input, "-5");
  userEvent.click(WithdrawBtn);
  screen.getByText("Error: Amount should be higher than zero");
});

test("Error is shown when Withdraw amount is zero", () => {
  render(
    <UserContext.Provider
      value={{
        users: [],
        currentUser: {
          name: "user1",
          email: "email1@test.com",
          password: "password1",
          balance: 100,
        },
      }}
    >
      <Withdraw />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Withdraw Amount");

  const WithdrawBtn = screen.getByText("Withdraw", { selector: "button" });
  // Withdraw button should be disabled because amount is not provided
  userEvent.type(input, "0");
  userEvent.click(WithdrawBtn);
  screen.getByText("Error: Amount should be higher than zero");
});

test("Error is shown when Withdraw amount is not a number", () => {
  render(
    <UserContext.Provider
      value={{
        users: [],
        currentUser: {
          name: "user1",
          email: "email1@test.com",
          password: "password1",
          balance: 100,
        },
      }}
    >
      <Withdraw />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Withdraw Amount");

  const WithdrawBtn = screen.getByText("Withdraw", { selector: "button" });
  // Withdraw button should be disabled because amount is not provided
  userEvent.type(input, "zxc");
  userEvent.click(WithdrawBtn);
  screen.getByText("Error: Incorrect input");
});

test("Error is shown when withdrawn amount is higher than balance", () => {
  render(
    <UserContext.Provider
      value={{
        users: [],
        currentUser: {
          name: "user1",
          email: "email1@test.com",
          password: "password1",
          balance: 100,
        },
      }}
    >
      <Withdraw />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Withdraw Amount");

  const WithdrawBtn = screen.getByText("Withdraw", { selector: "button" });
  // Withdraw button should be disabled because amount is not provided
  userEvent.type(input, "200");
  userEvent.click(WithdrawBtn);
  screen.getByText("Error: Insufficient funds");
});
