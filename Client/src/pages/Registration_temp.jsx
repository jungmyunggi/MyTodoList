import React, { useState, useCallback } from "react";
import MemoizedInput from "../components/Input";
import "../assets/styles/registration/registration.scss";
import { useNavigate } from "react-router-dom";
import backButton from "../assets/images/free-icon-back-arrow-8138445.png";
import members from "../util/member";
export default function Registration() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      if (name === "id") {
        setId(value);
      } else if (name === "password") {
        setPassword(value);
      } else if (name === "name") {
        setName(value);
      }
    },
    [setId, setPassword, setName]
  );
  const handleRegistration = () => {
    const existingMember = members.find((m) => m.id === id);
    if (existingMember) {
      alert("이미 존재하는 아이디입니다.");
    } else {
      const newMember = { id, password, name };
      members.push(newMember);
      alert("회원가입 성공:", newMember);
      navigate("/login");
    }
  };
  return (
    <div className="registration-container">
      <header className="registration-header">
        <img
          src={backButton}
          alt="뒤로가기"
          className="back-button"
          onClick={() => navigate(-1)}
        />
        <span className="registration-header-title">Registration</span>
      </header>
      <section className="registration-section">
        <MemoizedInput
          className={"registration-section-input"}
          placeholder={"아이디"}
          name={"id"}
          onChange={handleInputChange}
        />
        <MemoizedInput
          className={"registration-section-input"}
          placeholder={"비밀번호"}
          name={"passoword"}
          onChange={handleInputChange}
        />
        <MemoizedInput
          className={"registration-section-input"}
          placeholder={"이름"}
          name={"name"}
          onChange={handleInputChange}
        />
        <button
          className="registration-section-button"
          onClick={handleRegistration}
        >
          회원가입
        </button>
      </section>
    </div>
  );
}
