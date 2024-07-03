import { useNavigate } from "react-router-dom";
import "../../assets/styles/mypage/mypage.scss";
export default function MyPage(){
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/Login")
    }

    return <div className="mypage-container">
        <header className="mypage-header">
        </header>
        <section className="mypage-section">
        
        <p className="mypage-section-username">사용자 이름: {localStorage.getItem("name")}</p>
        <p className="mypage-section-signupTime">가입날짜: {localStorage.getItem("signupTime").slice(0,10)}</p>
        <button className="mypage-logoutbutton" onClick={handleLogout}>로그아웃</button>
        </section>
        <footer className="mypage-footer"></footer>
    </div>

}