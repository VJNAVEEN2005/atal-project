const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const Tender = require('./Models/Tender');
const tenderRoutes = require('./routes/tenderRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/tenders', tenderRoutes);

// Sync Database and Start Server
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced successfully');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
