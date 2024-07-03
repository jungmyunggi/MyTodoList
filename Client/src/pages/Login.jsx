import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MemoizedInput from '../components/Input';
import '../assets/styles/login/login.scss';
import { baseUrl } from '../util/baseUrl';
import formatDate from '../util/formatDate';
import axios from 'axios';
// import { loginEmail, signupEmail } from '../firebase';
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
            const response = await axios.post(`${baseUrl}/api/auth/login`, {
                id,
                password
            });
    
            if (response.status === 200) {
                const result = response.data;
                console.log('Login successful:', result);
                localStorage.setItem("name",result.name)
                localStorage.setItem("signupTime", result.signupTime)
                console.log(result)
                // 대시보드로 이동
                navigate('/DashBoard');
            } else {
                throw new Error('Login failed');
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
                    <p>아이디가 없으신가요?<Link to={"/register"}>회원가입</Link></p>
                    <p>아이디 찾기 / 비밀번호 초기화</p>
                </section>
            </div>
            <div className="login-container-half logo"></div>
        </div>
    );
}
