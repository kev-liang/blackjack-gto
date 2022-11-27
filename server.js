const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cardController = require("./controller/CardController");
const path = require("path");

console.log("process", process.env);

let port = process.env.NODE_ENV !== "production" ? 5000 : process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.use(express.static("client/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

cardController(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
