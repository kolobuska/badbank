import { render } from "@testing-library/react";
import Login from "../login";
import userEvent from "@testing-library/user-event";
import UserContext from "../context";

test("Login Page should render", () => {
  const { getByText, getByLabelText } = render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <Login />
    </UserContext.Provider>
  );

  getByText("Login", { selector: "div" });
  getByText("Email");
  getByLabelText("Email");
  getByText("Password");
  getByLabelText("Password");
  getByText("Login", { selector: "button" });
});

test("Error should be shown when email is empty", () => {
  const { getByText, getByLabelText } = render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <Login />
    </UserContext.Provider>
  );

  const password = getByLabelText("Password");
  const loginBtn = getByText("Login", { selector: "button" });

  userEvent.type(password, "test");
  userEvent.click(loginBtn);

  getByText("Error: Email can't be empty");
});

test("Error should be shown when password is empty", () => {
  const { getByText, getByLabelText } = render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <Login />
    </UserContext.Provider>
  );

  const email = getByLabelText("Email");
  const loginBtn = getByText("Login", { selector: "button" });

  userEvent.type(email, "test");
  userEvent.click(loginBtn);

  getByText("Error: Password can't be empty");
});

test("User can login", () => {
  const { getByText, getByLabelText, queryByLabelText } = render(
    <UserContext.Provider
      value={{
        users: [
          {
            name: "user1",
            email: "test@test.com",
            password: "password",
            balance: 100,
          },
        ],
        currentUser: "",
      }}
    >
      <Login />
    </UserContext.Provider>
  );

  const email = getByLabelText("Email");
  const password = getByLabelText("Password");
  const loginBtn = getByText("Login", { selector: "button" });

  userEvent.type(email, "test@test.com");
  userEvent.type(password, "password");
  userEvent.click(loginBtn);

  getByText("Success");
  getByText("You are now logged in");
  getByText("Logout");

  expect(queryByLabelText("Email")).toBeNull();
  expect(queryByLabelText("Password")).toBeNull();
  expect(queryByLabelText("Login", { selector: "button" })).toBeNull();
});
