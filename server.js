require("dotenv").config();

const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const express = require("express");
const app = express();
const db = pgp({
  host: "localhost",
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

app.use(bodyParser.json());

// app.get("/api/songs", function(req, res) {
//   db.any("SELECT * FROM song")
//     .then(function(data) {
//       res.json(data);
//     })
//     .catch(function(error) {
//       res.json({ error: error.message });
//     });
// });

app.get("/api/artist", function(req, res) {
  db.any("SELECT name FROM artist")
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

app.get("/api/songs", function(req, res) {
  db.any(
    "SELECT song.id, artist.name, song.title, song.year FROM artist, song WHERE artist.id = song.artist_id"
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

//song.title artist.id

app.listen(8080, function() {
  console.log("Listening on port 8080!");
});
