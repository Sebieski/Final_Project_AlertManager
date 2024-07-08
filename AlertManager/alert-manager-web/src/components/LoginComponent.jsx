import { useState } from 'react';
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import {parseJwt} from "../utils/commonFunctions.jsx";


const LoginComponent = ({ setUserId, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = async (username, password) => {
        const response = await fetch('https://localhost:7249/api/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        return response.text();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(username, password);
            const decodedToken = parseJwt(token);
            const userId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
            setUserId(userId);
            setToken(token);
        } catch (error) {
            setError('Błędna nazwa użytkownika lub hasło');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Logowanie do Alert Manager</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Nazwa użytkownika</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Hasło</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;

LoginComponent.propTypes = {
    setUserId: PropTypes.func,
    setToken: PropTypes.func,
}
