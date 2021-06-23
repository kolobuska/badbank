import * as React from 'react';
import Card from './card';

function BankForm(props) {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleCreate = () => {
        if (!validate(name, 'name')) return;
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;
        const data = {
            name: name,
            email: email,
            password: password
        };   
        props.handle(data);
        setShow(false);
    }

    const validate = (field, label) => {
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return (
        <Card
            bgcolor={props.bgcolor}
            header={props.label}
            status={status}
            body={show ? (
                <>
                    <label htmlFor="name">Name</label><br />
                    <input type="input" className="form-control" id="name"
                        placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br />
                    <label htmlFor="email">Email address</label><br />
                    <input type="input" className="form-control" id="email"
                        placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
                    <label htmlFor="password">Password</label><br />
                    <input type="password" className="form-control" id="password"
                        placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={e => handleCreate()}>{props.label}</button>
                </>
            ) : (
                <>
                    <h5>Success</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>{props.successButton}</button>
                </>
            )}
        />

    );

}

export default BankForm;