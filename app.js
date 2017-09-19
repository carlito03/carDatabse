var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cars");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//schema setup

var carSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String
});

var Car = mongoose.model("MyCars", carSchema);

app.get("/", function(req,res){
    //get all cars

    res.render("landing");
   
   //
});

app.get("/cars", function(req, res){
    // get all the cars
     Car.find({}, function (err,allCars) {
        // body...
        if(err){
            console.log(err);
        }else {
             res.render("index", {cars:allCars});
        }
    });
});


app.post("/cars", function (req,res) {
    // get data from form and too array
    
    var name =  req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCar = {name: name, image:image, description:description};
    
    // Create new car and save to DB
    
    Car.create(newCar, function (err, newlyCreated) {
        // body...
        if(err){
            console.log(err)
        }else {
            res.redirect("/cars")
        }
    });
});

app.get("/cars/new", function(req, res) {
    res.render("new.ejs");
});

app.get("/cars/:id", function(req, res) {
    //find car by provided ID
    Car.findById(req.params.id, function(err, foundCar){
        if(err){
            console.log(err);
        }else{
            //render show template with that ID 
            res.render("show", {car: foundCar});
        }
        
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   
   console.log("SERVER STARTED"); 
    
});