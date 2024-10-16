const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
const path = require('path');

const eventScheduleRoutes = require('./routes/eventScheduleRoutes');
const teamRoutes = require('./routes/teamRoutes');
const authRoutes = require('./routes/authRoutes');
const liveupdateRoutes = require('./routes/liveupdateRoute');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

app.use(cors());
app.use(bodyParser.json());

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/event', eventScheduleRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/liveupdate', liveupdateRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Backend is running')
})

const PORT = process.env.API_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
