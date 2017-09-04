var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

  var cars = [
        {name:"Car 1", image:"http://www.photosforclass.com/download/6532389979"},
         {name:"Car 2", image:"https://farm9.staticflickr.com/8041/8021211725_d7f595b53d.jpg"},
          {name:"Car 3", image:"https://farm7.staticflickr.com/6113/6277318013_c750b0c828.jpg"},
           {name:"Car 4", image:"https://farm7.staticflickr.com/6113/6277318013_c750b0c828.jpg"}
        ];

app.get("/", function(req,res){
    
    res.render("landing");
});

app.get("/cars", function(req, res){
    
   
    res.render("cars", {cars:cars});
});


app.post("/cars", function (req,res) {
    // get data from form and too array
    
    var name =  req.body.name;
    var image = req.body.image;
    var newCar = {name: name, image:image};
    
    cars.push(newCar);
    //redirect to cars page
    res.redirect("/cars");
    
});

app.get("/cars/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
   
   console.log("SERVER STARTED"); 
    
});