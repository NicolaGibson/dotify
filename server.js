require('dotenv').config();

const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const express = require('express');
const app = express();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

app.use(bodyParser.json());

app.get('/api/songs', function(req, res){
    db.any('SELECT * FROM song')
      .then(function(data) {
          res.json(data);
      })
      .catch(function(error) {
          res.json({error: error.message});
      });
});

app.listen(8080, function() {
  console.log('Listening on port 8080!');
});