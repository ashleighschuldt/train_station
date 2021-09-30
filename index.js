const express = require('express');
const massive = require('massive');
const cors = require('cors');
const app = express();
const path = require('path');
const trainScheduleRoutes = require('./routes/train_schedule');

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(trainScheduleRoutes);

massive(process.env.DATABASE_URL).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('db is running.');
})
.catch(err => {
    console.error(`Failed to connect: ${err}`);
})

const PORT = 8080;

app.use(express.static(path.join(__dirname, './build')))
const port = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
