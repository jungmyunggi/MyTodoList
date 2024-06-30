import React, { useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MemoizedInput } from '../components/Input';
import '../assets/styles/login/login.scss';
import members from '../util/member';

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleInputChange = useCallback(
        (event) => {
            const { name, value } = event.target;

            if (name === 'id') {
                setId(value);
            } else if (name === 'password') {
                setPassword(value);
            }
        },
        [setId, setPassword]
    );

    const handleLogin = () => {
        const member = members.find((m) => m.id === id && m.password === password);
        if (member) {
            //   alert("로그인 성공");
            navigate('/Dashboard');
        } else {
            alert('로그인 실패');
            console.log(id, password);
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
                        placeholder={'아이디'}
                        name={'id'}
                        onChange={handleInputChange}
                    />
                    <MemoizedInput
                        className="login-section-input"
                        placeholder={'비밀번호'}
                        name={'password'}
                        onChange={handleInputChange}
                        type={'password'}
                    />
                    <button className="login-section-button" onClick={handleLogin}>
                        로그인
                    </button>
                </section>
                <footer className="login-footer">
                    <p className="login-footer-registration">
                        아이디가 없으신가요? <Link to="/register">회원가입</Link>
                    </p>
                    <p className="login-footer-find">아이디 찾기 / 비밀번호 재설정</p>
                </footer>
            </div>
            <div className="login-container-half logo"></div>
        </div>
    );
}
