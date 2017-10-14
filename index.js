const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000;
// meaning: in development environment we'll use port 5000
// and in production environment we'll use whatever port Heroku is attempting to provide to us
app.listen(PORT);