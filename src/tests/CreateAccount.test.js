import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateAccount from '../createaccount';
import * as React from 'react';
import UserContext from "../context";

/*test('Create account page should render', () => {
  render(<CreateAccount />);
  
  screen.getByText("Create Account", { selector: 'div' });

  screen.getByText("Name");
  screen.getByText("Email address");
  screen.getByText("Password");

  expect(screen.queryByText('Create Account', {selector: 'button'})).toBeTruthy();

});*/

test('User Can Create account', () => {
  render(
  <UserContext.Provider value={{users:[{name:'abel', email:'abel@mit.edu', password:'secret', balance:100}], currentUser:''}}>
  <CreateAccount />
  </UserContext.Provider>
  );
 
  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email address");
  const passwordInput = screen.getByLabelText("Password");
  const createAccountBtn = screen.queryByText('Create Account', {selector: 'button'})

  userEvent.type(nameInput, "Test User");
  userEvent.type(emailInput, "test@test.com");
  userEvent.type(passwordInput, "123");

  userEvent.click(createAccountBtn);

  screen.getByText("Success");
  screen.getByText("Add another account"); 
  
});