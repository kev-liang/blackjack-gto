const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cardController = require('./controller/CardController');

console.log('process', process.env);

let port = process.env.NODE_ENV === 'development' ? 5000 : process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
	res.send('sup');
});

cardController(app);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
