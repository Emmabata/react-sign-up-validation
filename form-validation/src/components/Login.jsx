import React, { useState } from 'react';

    const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
    // Perform login logic (you might want to connect to a backend server here)
    onLogin({ username, password });
    };

return (
    <div>
        <h2>Login</h2>
        <label>
        Username:
        <input type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            />
        </label>
        <br />
        <label>
        Password:
        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            />
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
    </div>
    );
    };

export default Login;
