const express = require('express');
const discord = require('./discord')
// const initPincone = require('./initializePinecone');
// const chat = require('./chat');
// const createVector = require('./createVector');
// const deleteVector = require('./deleteVector');
// const news = require('./news');
// const scrape = require('./scrape');
// const search = require('./searchEng');
// const searchEng = require('./searchEng');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	next();
});

// Add endpoints

app.use('/discord', discord)
// app.use('/initPinecone', initPincone);
// app.post('/chat', chat);
// app.get('/createVector', createVector);
// app.get('/deleteVector', deleteVector);
// app.get('/news', news);
// app.get('/scrape', scrape);
// app.get('/search', search);

const PORT = 5000;

app.listen(PORT, () => {
	console.log('Server started at');
	console.log(`http://localhost:${PORT}`);
});
