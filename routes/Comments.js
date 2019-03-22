var express=require("express");
var Router=express.Router();
var conn=require("../Campground");
var encrypt=require("../modules/Encrypt");
var camp=[];
Router.get("/campground/:id/comment",function(req,res)
{
    var IP=req.connection.remoteAddress;
    var user=req.headers["user-agent"];
    var validuser=encrypt(IP+""+user);
      conn.query("select * from state where IP='"+IP+"'"+"and sessid='"+validuser+"'",function(error,result,fields)
    {
        if(result.length==0)
        {
            req.flash("error","You must be signed in");
           res.redirect("/signin");
        }
        else
         res.render("comment",{type:req.params.id,username:result[0].uname}); 
    });
});
Router.post("/campground/:id/addcomment",function(req,res)
{
    var IP=req.connection.remoteAddress;
    var user=req.headers["user-agent"];
    var validuser=encrypt(IP+""+user);
    var state="";
    conn.query("select * from state where IP='"+IP+"'"+"and sessid='"+validuser+"'",function(error,result,fields)
    {
        if(result.length==0)
         res.redirect("/signin");
        else
        {
            var user=result[0].uname;
           var comment=req.body.comment;
           var date=new Date();
        var query="Insert into Comments(CampName,Comment,created,uname) values("+"'"+req.params.id+"'"+","+"'"+comment+"'"+","+"'"+date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+"'"+","+"'"+user+"'"+")";
       conn.query(query,function(error,result,fields)
      {
          if(error)
           console.log(error);
      });
     res.redirect("/campground/"+req.params.id); 
    }   
    }); 
});
Router.get("/campground/:comid/commentUpdate",function(req,res)
{
    var IP=req.connection.remoteAddress;
    var user=req.headers["user-agent"];
    var validuser=encrypt(IP+""+user);
    conn.query("select * from state where IP='"+IP+"'"+"and sessid='"+validuser+"'",function(error,result,fields)
    {
        if(result.length==0)
            state="not logged in";
        else
        {
            state="logged in";
            uname=result[0].uname;
        }
      conn.query("select * from Comments where commentID='"+req.params.comid+"'",function(error,result,fields)
      {
        res.render("editcomment",{result:result,username:uname});
      });
    }); 
});
Router.put("/campground/:comid/commentUpdate",function(req,res)
{
    var IP=req.connection.remoteAddress;
  var user=req.headers["user-agent"];
  var validuser=encrypt(IP+""+user);
    var com=req.body.comment;
    var state="";
    conn.query("select * from state where IP='"+IP+"'"+"and sessid='"+validuser+"'",function(error,result,fields)
    {
        if(result.length==0)
            state="not logged in";
        else
        {
            state="logged in";
            uname=result[0].uname;
        }
    var query="Update Comments set Comment='"+com+"'";
    conn.query(query,function(error,result,fields)
    {
    });
   res.redirect("/campground");              
   });
});
Router.delete("/campground/:comid/commentdelete",function(req,res)
{
   conn.query("delete from Comments where commentID='"+req.params.comid+"'",function(error,result,fields)
   {
   });
   res.redirect("back");
});
module.exports=Router;