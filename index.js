const express = require('express');
const app = express();
const cors = require('cors');
const trainScheduleRoutes = require('./routes/train_schedule');

app.use(express.json());
app.use(cors());
app.use(trainScheduleRoutes);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
