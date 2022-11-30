const express = require("express");

const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3001;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "howtoserve1004",
  database: "CRUD_Tutorial",
});

app.get("/", (req, res) => {
  res.send("hi");
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const coinName = req.body.coinName;
  const predictionComment = req.body.coinPrediction;
  const sqlInsert =
    "INSERT INTO CRUD_Tutorial.prediction (coin, predictionComment) VALUES (?,?)";
  db.query(sqlInsert, [coinName, predictionComment]);
  console.log("inserted");
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM prediction";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete =
    "DELETE FROM CRUD_Tutorial.prediction WHERE predictionComment = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
  });
});
