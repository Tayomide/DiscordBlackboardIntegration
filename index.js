const express = require('express');
const discord = require('./discord')

require('dotenv').config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	next();
});

// Add endpoints

app.post('/discord', discord)

const PORT = 5000;

app.listen(PORT, () => {
	console.log('Server started at');
	console.log(`http://localhost:${PORT}`);
});
