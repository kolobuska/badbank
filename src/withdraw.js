import * as React from "react";
import UserContext from "./context";
import Balance from "./balance";
import Card from "./card";

function WithDraw() {
  const [status, setStatus] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [withdrawEnabled, setWithdrawEnabled] = React.useState(false);
  const ctx = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(ctx.currentUser.balance);

  const handleWithdraw = () => {
    if (!validate(amount)) return;
    const newBalance = Number.parseInt(balance) - Number.parseInt(amount);
    setBalance(newBalance);
    setStatus("Sucessfully withdrawed");
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
    if (balance - amount < 0) {
      setStatus("Error: Insufficient funds");
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
      bgcolor="danger"
      txtcolor="dark"
      header="Withdraw"
      status={status}
      body={
        ctx.currentUser ? (
          <>
            <Balance />
            <br /> <br />
            <label htmlFor="withdraw">Withdraw Amount</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="withdraw"
              placeholder="Withdraw Amount"
              value={amount}
              onChange={(e) => amountChange(e.currentTarget.value)}
            />
            <br />
            <button
              disabled={!withdrawEnabled}
              type="submit"
              className="btn btn-light"
              onClick={handleWithdraw}
            >
              Withdraw
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

export default WithDraw;
