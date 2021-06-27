import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateAccount from "../createaccount";
import * as React from "react";
import UserContext from "../context";

test("Create account page should render", () => {
  render(<CreateAccount />);

  screen.getByText("Create Account", { selector: "div" });

  screen.getByText("Name");
  screen.getByText("Email address");
  screen.getByText("Password");

  expect(
    screen.queryByText("Create Account", { selector: "button" })
  ).toBeTruthy();
});

test("User Can Create account", async () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <CreateAccount />
    </UserContext.Provider>
  );

  let nameInput = screen.getByLabelText("Name");
  let emailInput = screen.getByLabelText("Email address");
  let passwordInput = screen.getByLabelText("Password");
  let createAccountBtn = screen.queryByText("Create Account", {
    selector: "button",
  });

  userEvent.type(nameInput, "Test User");
  userEvent.type(emailInput, "test@test.com");
  userEvent.type(passwordInput, "12345678");

  userEvent.click(createAccountBtn);

  screen.getByText("New Account created");
  screen.getByText("Add another account");

  expect(screen.queryByLabelText("Name")).toBeNull();
  expect(screen.queryByLabelText("Email address")).toBeNull();
  expect(screen.queryByLabelText("Password")).toBeNull();
  expect(
    screen.queryByText("Create Account", { selector: "button" })
  ).toBeNull();
});

test("Create Account button is disabled by default", async () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <CreateAccount />
    </UserContext.Provider>
  );

  const createAccountBtn = screen.queryByText("Create Account", {
    selector: "button",
  });
  expect(createAccountBtn).toBeDisabled();
});

test("Create Account button to be Enabled if we type name", async () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <CreateAccount />
    </UserContext.Provider>
  );

  const nameInput = screen.getByLabelText("Name");
  const createAccountBtn = screen.queryByText("Create Account", {
    selector: "button",
  });

  userEvent.type(nameInput, "Test User");
  expect(createAccountBtn).toBeEnabled();
});

test("Create Account button to be Enabled if we type email", async () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <CreateAccount />
    </UserContext.Provider>
  );

  const emailInput = screen.getByLabelText("Email address");
  const createAccountBtn = screen.queryByText("Create Account", {
    selector: "button",
  });

  userEvent.type(emailInput, "Email address");
  expect(createAccountBtn).toBeEnabled();
});

test("Create Account button to be Enabled if we type password", async () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <CreateAccount />
    </UserContext.Provider>
  );

  const passwordInput = screen.getByLabelText("Password");
  const createAccountBtn = screen.queryByText("Create Account", {
    selector: "button",
  });

  userEvent.type(passwordInput, "Password");
  expect(createAccountBtn).toBeEnabled();
});

test("Error is shown when no name is filled", async () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <CreateAccount />
    </UserContext.Provider>
  );

  const emailInput = screen.getByLabelText("Email address");
  const passwordInput = screen.getByLabelText("Password");
  const createAccountBtn = screen.queryByText("Create Account", {
    selector: "button",
  });

  userEvent.type(emailInput, "test@test.com");
  userEvent.type(passwordInput, "12345678");

  userEvent.click(createAccountBtn);

  screen.getByText("Error: Name can't be empty");
});

test("Error is shown when no email is filled", async () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <CreateAccount />
    </UserContext.Provider>
  );

  const nameInput = screen.getByLabelText("Name");
  const passwordInput = screen.getByLabelText("Password");
  const createAccountBtn = screen.queryByText("Create Account", {
    selector: "button",
  });

  userEvent.type(nameInput, "Test User");
  userEvent.type(passwordInput, "12345678");

  userEvent.click(createAccountBtn);

  screen.getByText("Error: Email can't be empty");
});

test("Password can't be shorter than 8 symbols", async () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <CreateAccount />
    </UserContext.Provider>
  );

  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email address");
  const passwordInput = screen.getByLabelText("Password");
  const createAccountBtn = screen.queryByText("Create Account", {
    selector: "button",
  });

  userEvent.type(nameInput, "Test User");
  userEvent.type(emailInput, "test@test.com");
  userEvent.type(passwordInput, "1234567");

  userEvent.click(createAccountBtn);

  screen.getByText("Error: Password should be 8 characters or more");
});
