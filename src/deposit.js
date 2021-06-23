import * as React from 'react';
import Balance from './balance';
import Card from './card';
import UserContext from "./context";

function Deposit() {
    const [status, setStatus] = React.useState('');
    const [deposit, setDeposit] = React.useState('');
    const ctx = React.useContext(UserContext);
    const [balance, setBalance] = React.useState(ctx.currentUser.balance);

    const handleDeposit = () => {
        if (!validate(deposit, 'deposit')) return;
        const newBalance = Number.parseInt(balance) + Number.parseInt(deposit);
        setBalance(newBalance);
        setStatus('Sucessfully deposited');
        ctx.currentUser.balance = newBalance;
        setTimeout(() => setStatus(''), 3000);
    }

    const validate = (field, label) => {
        if (!field | field <= 0) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    return (
        <Card
            bgcolor="success"
            txtcolor="dark"
            header="Deposit"
            status={status}
            body={ctx.currentUser ? (
                <>
                    <Balance/><br/> <br/>
                    Deposit Amount<br />
                    <input type="text" className="form-control" id="deposit"
                        placeholder="Deposit Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
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

export default Deposit;