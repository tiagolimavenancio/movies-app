require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler')
const dbConfig = require('./database/db');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', routes);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    if(!err.statusCode)
        err.statusCode = 500

    res.status(err.statusCode).send(err.message);
});

const port = process.env.PORT || 3333;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => {
    console.log('Can not connect to the database. ' + err);
});


