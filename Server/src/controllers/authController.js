const { db, admin } = require('../utils/firebase');
const axios = require('axios');

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
        console.error('Error during login:', error.response.data);
        res.status(500).json({ message: 'Invalid credentials' });
    }
};

exports.register = async (req, res) => {
    const { id, password, name } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email: id,
            password,
            displayName: name,
        });

        await db.collection('users').doc(userRecord.uid).set({
            id,
            name,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
