import React, { useState, useCallback } from 'react';
import MemoizedInput from '../components/Input';
import '../assets/styles/registration/registration.scss';
import { useNavigate } from 'react-router-dom';
import backButton from '../assets/images/free-icon-back-arrow-8138445.png';
import members from '../util/member';
import { baseUrl } from '../util/baseUrl';
export default function Registration() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const handleInputChange = useCallback(
        (event) => {
            const { name, value } = event.target;

            if (name === 'id') {
                setId(value);
            } else if (name === 'password') {
                setPassword(value);
            } else if (name === 'name') {
                setName(value);
            }
        },
        [setId, setPassword, setName]
    );
    const handleRegister = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password, name }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                alert('회원가입 실패');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('회원가입 실패');
        }
    };
    return (
        <div className="registration-container">
            <header className="registration-header">
                <img src={backButton} alt="뒤로가기" className="back-button" onClick={() => navigate(-1)} />
                <span className="registration-header-title">Registration</span>
            </header>
            <section className="registration-section">
                <MemoizedInput
                    className={'registration-section-input'}
                    placeholder={'아이디'}
                    name={'id'}
                    onChange={handleInputChange}
                />
                <MemoizedInput
                    className={'registration-section-input'}
                    placeholder={'비밀번호'}
                    name={'passoword'}
                    onChange={handleInputChange}
                />
                <MemoizedInput
                    className={'registration-section-input'}
                    placeholder={'이름'}
                    name={'name'}
                    onChange={handleInputChange}
                />
                <button className="registration-section-button" onClick={handleRegister}>
                    회원가입
                </button>
            </section>
        </div>
    );
}
