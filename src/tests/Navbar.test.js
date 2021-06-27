import { render } from "@testing-library/react";
import NavBar from "../navbar";
import { HashRouter } from "react-router-dom";

test("NavBar should render", () => {
  const { getByText } = render(
    <HashRouter>
      <NavBar />
    </HashRouter>
  );

  const home = getByText("Home");
  expect(home).toHaveAttribute("href", "#/");

  const createAccount = getByText("Create Account");
  expect(createAccount).toHaveAttribute("href", "#/createaccount");

  const login = getByText("Login");
  expect(login).toHaveAttribute("href", "#/login");

  const deposit = getByText("Deposit");
  expect(deposit).toHaveAttribute("href", "#/deposit");

  const withdraw = getByText("Withdraw");
  expect(withdraw).toHaveAttribute("href", "#/withdraw");

  const allData = getByText("All Data");
  expect(allData).toHaveAttribute("href", "#/alldata");
});
