import * as React from "react";
import Balance from "./balance";
import Card from "./card";
import UserContext from "./context";

function Deposit() {
  const [status, setStatus] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [withdrawEnabled, setWithdrawEnabled] = React.useState(false);
  const ctx = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(ctx.currentUser.balance);

  const handleDeposit = () => {
    if (!validate(amount)) return;
    const newBalance = Number.parseInt(balance) + Number.parseInt(amount);
    setBalance(newBalance);
    setStatus("Sucessfully deposited");
    ctx.currentUser.balance = newBalance;
    setTimeout(() => setStatus(""), 3000);
  };

  const validate = (value) => {
    if (isNaN(value)) {
      setStatus("Error: Incorrect input");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (value <= 0) {
      setStatus("Error: Amount should be higher than zero");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const amountChange = (amount) => {
    setAmount(amount);
    if (amount.length > 0) {
      setWithdrawEnabled(true);
      return;
    }
    setWithdrawEnabled(false);
  };

  return (
    <Card
      bgcolor="info"
      txtcolor="dark"
      header="Deposit"
      status={status}
      body={
        ctx.currentUser ? (
          <>
            <Balance />
            <br /> <br />
            <label htmlFor="deposit">Deposit Amount</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="deposit"
              placeholder="Deposit Amount"
              value={amount}
              onChange={(e) => amountChange(e.currentTarget.value)}
            />
            <br />
            <button
              disabled={!withdrawEnabled}
              type="submit"
              className="btn btn-light"
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </>
        ) : (
          <>
            <div>You are not logged in</div>
          </>
        )
      }
    />
  );
}

export default Deposit;
