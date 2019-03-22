var express=require("express");
var Router=express.Router();
var conn=require("../Campground");
var encrypt=require("../modules/Encrypt");
var uname="";
var usermail="";
var email=require("emailjs");
var count=0;
Router.get("/",function(req,res)
{
     res.render("Welcome");
});
Router.get("/signup",function(req,res)
{
    res.render("signup",{error:req.flash("error")});
});
Router.post("/signup",function(req,res)
{
    var user=req.body.username;
    var pass=req.body.pass;
    var firstencrypt=encrypt(pass);
    firstencrypt="P"+firstencrypt+"D";
    var secondencrypt=encrypt(firstencrypt);
    conn.query("select * from User where username='"+user+"'",function(error,result,fields)
    {
        if(result.length!=0)
        {
          req.flash("error","Username exists!");
          res.redirect("/signup");
        }
        else
        {
            conn.query("insert into User values("+"'"+user+"'"+","+"'"+secondencrypt+"'"+")",function(error,result,fields)
           {
           });
           res.redirect("/signin"); 
        }
    });
});
Router.get("/signin",function(req,res)
{   
     res.render("signin",{error:req.flash("error"),success:req.flash("success")});
});
Router.post("/signin",function(req,res)
{
    var user=req.body.username;
    var pass=req.body.pass;
    var firstencrypt=encrypt(pass);
    firstencrypt="P"+firstencrypt+"D";
    var secondencrypt=encrypt(firstencrypt);
    conn.query("select * from User where username='"+user+"'",function(error,result,fields)
    {
        
       if(result.length==0)
       {
           req.flash("error","username or password is wrong");
           res.redirect("/signin");
       }
       else if(result[0].password!=secondencrypt)
       {
         req.flash("error","username or password is wrong");
         res.redirect("/signin");
       }
       else if(result[0].password==secondencrypt)
         res.redirect("/save");
         
    });
    uname=user;
});
Router.get("/save",function(req,res)
{
    var IP=req.connection.remoteAddress;
    var user=req.headers["user-agent"];
    var validuser=encrypt(IP+""+user);
    conn.query("select * from state where IP='"+IP+"'"+"and sessid='"+validuser+"'",function(error,result,fields)
    {
       if(result.length==0)
       {
        conn.query("insert into state values("+"'"+IP+"'"+","+"'"+validuser+"'"+","+"'"+uname+"'"+")",function(error,result,fields)
       {
        if(error)
          console.log(error);
      });
      var msg="Signed in as "+uname;
      req.flash("success",msg);
      res.redirect("/campground");
    }
     else      
      res.redirect("/campground");
  });
}); 
Router.get("/signout",function(req,res)
{
    var IP=req.connection.remoteAddress;
    var user=req.headers["user-agent"];
    var validuser=encrypt(IP+""+user);
    conn.query("delete from state where IP='"+IP+"'"+" and sessid='"+validuser+"'",function(error,result,fields)
    {
    });
   req.flash("success","Signed you out"); 
   res.redirect("/campground"); 
});
Router.get("/forgotpass",function(req,res)
{
     res.render("forgotpass");
});
Router.post("/forgotpass",function(req,res)
{
     usermail=req.body.email;
    var server=email.server.connect({
               user:"yelpcamp500@gmail.com",
               password:"Windows90#",
               host:"smtp.gmail.com",
               ssl:true
    });
    server.send({
        text:"Dear User, This is Soumak from YelpCamp team. You\n requested for password reset\nClick on the link: http://192.168.0.101:3000/resetpass\n\nRegards,\nSoumak Chakraborty",
        to:usermail,
        from:"yelpcamp500@gmail.com",
        subject:"Reset password"
    },function(err,msg)
    {
        console.log(err|msg);
    });
    req.flash("success","Reset details sent successfully");
    res.redirect("/signin");
});
Router.get("/resetpass",function(req,res)
{
     res.render("resetpassword");
});
Router.put("/resetpass",function(req,res)
{
  var pass=req.body.pass;
  var firstencrypt=encrypt(pass);
  firstencrypt="P"+firstencrypt+"D";
  var secondencrypt=encrypt(firstencrypt);
      conn.query("update User set password='"+secondencrypt+"'"+"where username='"+usermail+"'",function(err,result,fields)
      {
      });
      res.redirect("/signin");
});
module.exports=Router;