const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes.js');
const cors = require('cors');

dotenv.config();

const app = express();

// CORS 설정
app.use(
    cors({
        origin: '*', // 모든 출처 허용
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 허용할 HTTP 메서드
        allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
    })
);

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});