import { render, screen } from "@testing-library/react";
import AllData from "../alldata";
import * as React from "react";
import UserContext from "../context";

test("All data page should render", () => {
  render(
    <UserContext.Provider value={{ users: [], currentUser: "" }}>
      <AllData />
    </UserContext.Provider>
  );

  screen.getByText("All Data", { selector: "div" });

  screen.getByText("#");
  screen.getByText("Name");
  screen.getByText("E-mail");
  screen.getByText("Password");
  screen.getByText("Balance");
});

test("Data in table should render", () => {
  render(
    <UserContext.Provider
      value={{
        users: [
          {
            name: "user1",
            email: "email1@test.com",
            password: "password1",
            balance: 100,
          },
          {
            name: "user2",
            email: "email2@test.com",
            password: "password2",
            balance: 200,
          },
        ],
        currentUser: "",
      }}
    >
      <AllData />
    </UserContext.Provider>
  );

  // render first line
  screen.getByText("1");
  screen.getByText("user1");
  screen.getByText("email1@test.com");
  screen.getByText("password1");
  screen.getByText("100");

  // render second line
  screen.getByText("2");
  screen.getByText("user2");
  screen.getByText("email2@test.com");
  screen.getByText("password2");
  screen.getByText("200");
});
