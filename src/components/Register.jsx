import { useState } from 'react';
import { fetchRegister } from '../Api';
import { Navigate } from 'react-router-dom'; 

const Register = ({ setToken }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = await fetchRegister(firstname, lastname, email, password);
        if (data.token) {
            setToken(data.token);
            Navigate('/login'); 
        }
    }

    return (
    <>
    <h2>Register</h2>
    <form className='regForm' onSubmit={handleSubmit}>
        <label>
            <h2>First Name:</h2>
            <input value={firstname} type="text" 
            onChange={(e) => setFirstname(e.target.value)} />
        </label>
        <label>
           <h2>Last Name:</h2>
            <input value={lastname} type="text"
            onChange={(e) => setLastname(e.target.value)} />
        </label>
        <label>
            <h2>Email:</h2>
            <input value={email} type="email"
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
            <h2>Password:</h2>
            <input value={password} type="password"
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit"> Register </button>
    </form>
    </>
    )
}
export default Register;
