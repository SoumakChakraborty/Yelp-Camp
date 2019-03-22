var express=require("express");
var app=express();
var camp=require("./routes/Campgrounds");
var comm=require("./routes/Comments");
var index=require("./routes/Index");
var method=require("method-override");
var body=require("body-parser");
var flash=require("connect-flash");
var session=require("express-session");
app.use(session({
   secret:"Soumak Chakraborty",
   resave:false,
   saveUninitialized:false
}));
app.use(flash());
app.use(method("_method"));
app.set("view engine","ejs");
app.use(express.static("Public"));
app.use(body.urlencoded({extended:true}));
app.use(camp);
app.use(comm);
app.use(index);
app.listen(process.env.PORT,process.env.IP,function()
{
   console.log("Server started");
});