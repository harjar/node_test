import express from "express";

const app = express();

app.use(function(req, res, next) {
    let start = new Date(Date.now());
    console.log("Time:", start);
    res.send("Hello World, apa "+start);
});

app.listen(3000);