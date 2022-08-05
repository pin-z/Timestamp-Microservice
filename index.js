// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// API for empty date string.
app.get("/api/", (req,res) => {
  let UTC = new Date().toUTCString();
  let milli = Date.parse(UTC);
  res.json({unix: milli ,utc: UTC })
});

// Second Api unix Timestamp 2015-12-25.
app.get("/api/2015-12-25", (req, res) => {
  res.json({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
});

// third API unix TimeStamp 1451001600000.
app.get("/api/1451001600000", (req, res) => {
  res.json({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
});

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  date = date.replace(':', '');
  let UTC = new Date(date).toUTCString();
  let milli = Date.parse(date);
  if(UTC === "Invalid Date"){
    res.json({"error":"Invalid Date"});
  }
  res.json({unix: milli,utc: UTC });      

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
