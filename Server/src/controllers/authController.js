const axios = require('axios');
const dotenv = require('dotenv');
const { db } = require("../utils/firebase");
dotenv.config();

exports.login = async (req, res) => {
    const { id, password } = req.body;

    try {
        console.log('Login request received:', { id, password });

        const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;
        console.log('Using Firebase API endpoint:', endpoint);

        const response = await axios.post(endpoint, {
            email: id,
            password: password,
            returnSecureToken: true,
        });

        // console.log('Firebase login response:', response.data);

        const { idToken, localId, displayName } = response.data;

        // Firestore에서 signupTime 가져오기
        const userRef = db.collection('users').doc(localId);
        const userDoc = await userRef.get();
        let signupTime;
        if (userDoc.exists) {
            signupTime = userDoc.data().signupTime;
            signupTime = new Date(signupTime._seconds * 1000 + Math.floor(signupTime._nanoseconds / 1000000));
        } else {
            signupTime = null; // 사용자 데이터가 없을 경우 처리
        }

        res.status(200).json({ token: idToken, userId: localId, name: displayName, signupTime: signupTime });
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);

        if (error.response) {
            const errorCode = error.response.data.error.message;

            if (errorCode === 'EMAIL_NOT_FOUND' || errorCode === 'INVALID_PASSWORD') {
                res.status(401).json({ message: 'Invalid email or password' });
            } else {
                res.status(500).json({ message: 'An error occurred during login', details: error.response.data });
            }
        } else {
            res.status(500).json({ message: 'Network error or server issue', details: error.message });
        }
    }
};

exports.signup = async (req, res) => {
    const { id, password, name } = req.body;
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password should be at least 6 characters' });
    }

    try {
        const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;

        const response = await axios.post(endpoint, {
            email: id, // Assuming id is email for Firebase authentication
            password: password,
            returnSecureToken: true,
        });

        const { idToken, localId } = response.data;

        // Firebase Authentication으로 사용자 프로필 업데이트
        const updateProfileEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.FIREBASE_API_KEY}`;
        
        await axios.post(updateProfileEndpoint, {
            idToken: idToken,
            displayName: name
        });

        // Firestore에 signupTime 저장
        const userRef = db.collection('users').doc(localId);
        await userRef.set({
            signupTime: new Date()
        });

        res.status(200).json({ token: idToken, userId: localId });
    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error.message);
        if (error.response) {
            const errorCode = error.response.data.error.message;

            switch (errorCode) {
                case 'EMAIL_EXISTS':
                    res.status(400).json({ message: 'Email already in use' });
                    break;
                case 'WEAK_PASSWORD : Password should be at least 6 characters':
                    res.status(400).json({ message: 'Weak password. Password should be at least 6 characters' });
                    break;
                default:
                    res.status(500).json({ message: 'An error occurred during signup', details: error.response.data });
                    break;
            }
        } else {
            res.status(500).json({ message: 'Network error or server issue', details: error.message });
        }
    }
};
