import * as React from 'react';
import UserContext from "./context";
import Balance from "./balance";
import Card from './card';

function WithDraw() {
    const [status, setStatus] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);
    const [balance, setBalance] = React.useState(ctx.currentUser.balance);

    const handleWithdraw = () => {
        if (!validate(amount, 'amount')) return;
        const newBalance = Number.parseInt(balance) - Number.parseInt(amount);
        setBalance(newBalance);
        setStatus('Sucessfully withdrawed');
        ctx.currentUser.balance = newBalance;
        setTimeout(() => setStatus(''), 3000);
    }

    const validate = (field, label) => {
        if (!field | field <= 0) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        if (balance - amount < 0) {
            setStatus('Error: Not enought money');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    return (
        <Card
            bgcolor="info"
            txtcolor="dark"
            header="Withdraw"
            status={status}
            body={ctx.currentUser ? (
                <>
                    <Balance/><br /> <br />
                    Withdraw Amount<br />
                    <input type="text" className="form-control" id="withdraw"
                        placeholder="Withdraw Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
                </>
            ) : (
                <>
                    <h5>Error</h5>
                    <div>You are not logged in</div>
                </>
            )}
        />

    );
}

export default WithDraw;