const { db } = require("../utils/firebase");

exports.getSchedule = async (req, res) => {
  const date = req.query.date;
  console.log("Received request for date:", date);

  try {
    const scheduleCollection = db.collection("schedules");
    let query = scheduleCollection;

    if (date) {
      // 날짜를 수동으로 변환
      const dateParts = date.split("-");
      const formattedDate = `${dateParts[0]}-${dateParts[1].padStart(
        2,
        "0"
      )}-${dateParts[2].padStart(2, "0")}`;
      console.log("Formatted date:", formattedDate);
      query = query.where("date", "==", formattedDate);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      console.log("No schedules found for date:", date);
      res.status(404).json({ message: "No schedules found" });
      return;
    }

    const schedules = [];
    snapshot.forEach((doc) => {
      schedules.push({ id: doc.id, ...doc.data() });
    });

    console.log("Schedules found:", schedules);
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error getting schedules:", error);
    res.status(500).json({ error: error.message });
  }
};
exports.addSchedule = async (req, res) => {
  console.log("newSchedule: ", req.body);
  const { date, todo, time, place } = req.body;

  if (!date || !todo || !time || !place) {
    res
      .status(400)
      .json({ message: "Missing fields, all fields are required" });
    return;
  }

  try {
    const scheduleCollection = db.collection("schedules");
    const newSchedule = {
      date,
      todo,
      time,
      place,
    };

    const docRef = await scheduleCollection.add(newSchedule);

    console.log("New schedule added with ID:", docRef.id);
    res.status(201).json({ message: "Schedule added", id: docRef.id });
  } catch (error) {
    console.error("Error adding schedule:", error);
    res.status(500).json({ error: error.message });
  }
};
