const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// console.log("FIREBASE_PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY);

if (!process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error('Missing FIREBASE_PRIVATE_KEY in .env file');
}

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
});

const db = admin.firestore();

module.exports = { admin, db };
