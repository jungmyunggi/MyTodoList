import React, { useState, useCallback } from 'react';
import MemoizedInput from '../components/Input';
import CompleteSignup from '../components/modals/completeSignup'; 
import '../assets/styles/registration/registration.scss';
import { useNavigate } from 'react-router-dom';
import backButton from '../assets/images/free-icon-back-arrow-8138445.png';
import axios from 'axios';
import { baseUrl } from '../util/baseUrl';

export default function Registration() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        navigate("/Login");
    };

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

    const handleSignup = async () => {
        try {
            console.log(id, password, name);

            const response = await axios.post(`${baseUrl}/api/auth/signup`, {
                id: id,
                password: password,
                name: name
            });

            if (response.status === 200) {
                handleOpenModal();
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
                    name={'password'} 
                    onChange={handleInputChange}
                />
                <MemoizedInput
                    className={'registration-section-input'}
                    placeholder={'이름'}
                    name={'name'}
                    onChange={handleInputChange}
                />
                <CompleteSignup isOpen={isOpen} onClose={handleCloseModal} text={"회원가입을 완료하였습니다"} />

                <button className="registration-section-button" onClick={handleSignup}>
                    회원가입
                </button>
            </section>
        </div>
    );
}
