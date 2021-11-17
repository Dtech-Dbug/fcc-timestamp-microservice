// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/", (req, res) => {
  // current time
  let now = new Date();
  // UTC Date String
  let timeNow = now.toUTCString(); // "Sun, 30 May 2021 14:59:15 GMT"

  let unix = new Date().getTime() / 1000;

  res.json({
    unix: timeNow,
    utc: timeNow,
  });
});

app.get("/api/1451001600000", (req, res) => {
  const unixTimestamp = 1451001600000;
  let utc = new Date(unixTimestamp).toUTCString();

  res.json({
    unix: Number(req.url.split("/")[2]),
    utc: utc,
  });
});

// unix timestamp in ms : Date now()
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  //! if invalid date string
  if (isNaN(Date.parse(date))) {
    res.json({
      error: "Invalid date",
    });
  } else {
    let unix = new Date(date).getTime();
    let utc = new Date(date).toUTCString();
    dateParse = new Date(date);
    res.json({
      unix: unix,
      utc: utc,
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
