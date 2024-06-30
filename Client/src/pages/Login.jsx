import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MemoizedInput from '../components/Input';
import '../assets/styles/login/login.scss';
import { baseUrl } from '../util/baseUrl';
export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        if (name === 'id') {
            setId(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                alert('로그인 실패');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('로그인 실패');
        }
    };

    return (
        <div className="login-container">
            <div className="login-container-half">
                <header className="login-header">
                    <span className="login-header-title">Login</span>
                </header>
                <section className="login-section">
                    <MemoizedInput
                        className="login-section-input"
                        placeholder="아이디"
                        name="id"
                        onChange={handleInputChange}
                    />
                    <MemoizedInput
                        className="login-section-input"
                        placeholder="비밀번호"
                        name="password"
                        type="password"
                        onChange={handleInputChange}
                    />
                    <button className="login-section-button" onClick={handleLogin}>
                        로그인
                    </button>
                </section>
            </div>
        </div>
    );
}
