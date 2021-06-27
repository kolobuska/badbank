import { render, screen } from "@testing-library/react";
import Home from "../home";

test("Home Page should render", () => {
  const { getByText } = render(<Home />);

  getByText("BadBank Landing Page");
  getByText("Welcome to the bank");
  getByText("You can use this bank");

  const logo = screen.getByRole("img");
  expect(logo).toHaveAttribute("src", "./bank.png");
});
