const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors middleware
const dotenv = require('dotenv').config();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configs/swagger');
const dbConnect = require('./configs/dbConnect');
const userRoutes = require('./routes/userRoutes')
const gameRoutes = require('./routes/gamesRoutes')

app.use(cors()); // Enable CORS for all routes

app.use(express.json());
const PORT = process.env.PORT || 4000;
dbConnect();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/app/users', userRoutes);
app.use('/app', gameRoutes);

app.use('/', (req, res) => {
  res.send(`<h1 style='color:white; background-color:black; margin:0;padding:.5cm;border-radius:2rem;text-align:center '>Hello there!👋 this is the index api for the app. running at this port 👉 ${PORT} </h1>`);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
app.use(notFound);
app.use(errorHandler);
