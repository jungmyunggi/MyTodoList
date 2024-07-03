// scheduleController.js
const { db } = require('../utils/firebase');

exports.getSchedule = async (req, res) => {
    const date = req.query.date;
    console.log(date)
    try {
        const scheduleCollection = db.collection('schedules');
        let query = scheduleCollection;

        if (date) {
            query = query.where('date', '==', date);
        }

        const snapshot = await query.get();

        if (snapshot.empty) {
            res.status(404).json({ message: 'No schedules found' });
            return;
        }

        const schedules = [];
        snapshot.forEach(doc => {
            schedules.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error getting schedules:', error);
        res.status(500).json({ error: error.message });
    }
};
