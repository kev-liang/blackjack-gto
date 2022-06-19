const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

console.log('process', process.env);
let port = process.env.NODE_ENV === 'development' ? 3000 : process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
	res.send('sup');
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
