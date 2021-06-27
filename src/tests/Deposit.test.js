import { render, screen } from "@testing-library/react";
import Deposit from "../deposit";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import UserContext from "../context";

test("Deposit page should render (user not logged in )", () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <Deposit />
    </UserContext.Provider>
  );

  screen.getByText("Deposit");
  screen.getByText("You are not logged in");
});

test("Deposit page should render (user logged in )", () => {
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
      <Deposit />
    </UserContext.Provider>
  );

  screen.getByText("Deposit", { selector: "div" });
  screen.getByText("Balance $100");
  screen.getByText("Deposit Amount", { selector: "label" });
  screen.getByLabelText("Deposit Amount");
  const depositBtn = screen.getByText("Deposit", { selector: "button" });
  // deposit button should be disabled because amount is not provided
  expect(depositBtn).toBeDisabled();
});

test("Deposit button should be enabled when amount is provided", () => {
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
      <Deposit />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Deposit Amount");

  const depositBtn = screen.getByText("Deposit", { selector: "button" });
  // deposit button should be disabled because amount is not provided
  expect(depositBtn).toBeDisabled();
  userEvent.type(input, "5");
  expect(depositBtn).toBeEnabled();
});

test("User can deposit money", () => {
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
      <Deposit />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Deposit Amount");

  const depositBtn = screen.getByText("Deposit", { selector: "button" });
  // deposit button should be disabled because amount is not provided
  userEvent.type(input, "111");
  userEvent.click(depositBtn);
  screen.getByText("Sucessfully deposited");
  screen.getByText("Balance $211");
});

test("Error is shown when deposit amount is negative", () => {
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
      <Deposit />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Deposit Amount");

  const depositBtn = screen.getByText("Deposit", { selector: "button" });
  // deposit button should be disabled because amount is not provided
  userEvent.type(input, "-5");
  userEvent.click(depositBtn);
  screen.getByText("Error: Amount should be higher than zero");
});

test("Error is shown when deposit amount is zero", () => {
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
      <Deposit />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Deposit Amount");

  const depositBtn = screen.getByText("Deposit", { selector: "button" });
  // deposit button should be disabled because amount is not provided
  userEvent.type(input, "0");
  userEvent.click(depositBtn);
  screen.getByText("Error: Amount should be higher than zero");
});

test("Error is shown when deposit amount is not a number", () => {
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
      <Deposit />
    </UserContext.Provider>
  );

  const input = screen.getByLabelText("Deposit Amount");

  const depositBtn = screen.getByText("Deposit", { selector: "button" });
  // deposit button should be disabled because amount is not provided
  userEvent.type(input, "zxc");
  userEvent.click(depositBtn);
  screen.getByText("Error: Incorrect input");
});
