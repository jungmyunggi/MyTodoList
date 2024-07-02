const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.login = async (req, res) => {
    const { id, password } = req.body;

    try {
        const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

        const response = await axios.post(endpoint, {
            email: id,
            password: password,
            returnSecureToken: true,
        });

        const { idToken, localId } = response.data;

        res.status(200).json({ token: idToken, userId: localId });
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

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;

        const response = await axios.post(endpoint, {
            email: email,
            password: password,
            returnSecureToken: true,
        });

        const { idToken, localId } = response.data;

        res.status(200).json({ token: idToken, userId: localId });
    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error.message);

        if (error.response) {
            const errorCode = error.response.data.error.message;

            if (errorCode === 'EMAIL_EXISTS') {
                res.status(400).json({ message: 'Email already in use' });
            } else {
                res.status(500).json({ message: 'An error occurred during signup', details: error.response.data });
            }
        } else {
            res.status(500).json({ message: 'Network error or server issue', details: error.message });
        }
    }
};