var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

var reservation = [];
var waitingList = [];

app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/add", function (req,res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req,res) {
    res.sendFile(path.join(__dirname, "tables.html"))
});

app.get("/api/tables", function (req,res) {
    return res.json(reservation);
});

app.get("/api/waitlist", function (req,res) {
    return res.json(waitingList);
});

app.post("/api/reservation", function(req,res) {
    var newReserv = req.body;
    newReserv.routeName = newReserv.name.replace(/ /g, "").toLowerCase();
    console.log(newReserv);

    if(reservation.length <= 4) {
        reservation.push(newReserv);
    } else {
        waitingList.push(newReserv);
    }

    res.json(newReserv);  
})

app.delete("/api/clear", function(req,res) {
        reservation = [];
        waitingList = [];
})







app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT); 
});
