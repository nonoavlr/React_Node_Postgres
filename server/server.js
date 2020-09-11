const express = require('express');
const app = express();
const index = require('./API/index');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


app.use('/query', index );

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;