// Dependencies
const fs = require("fs"),
  http = require("http"),
  https = require("https"),
  path = require("path"),
  cors = require("cors"),
  express = require("express"),
  app = express();

require("dotenv").config();
app.use(cors());
app.use(express.static(path.join(__dirname, "/..", "dist")));

app.get("/", function(req, res) {
  res.sendFile("index.html", { root: "./dist" });
});

const httpServer = http.createServer(app);

httpServer.listen(80, () => {
  console.log("HTTP Server running on port " + 80);
  console.log("http://localhost:" + 80);
});
