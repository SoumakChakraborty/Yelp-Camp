var express=require("express");
var Router=express.Router();
var conn=require("../Campground");
var encrypt=require("../modules/Encrypt");
var uname="";
Router.get("/add",function(req,res)
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
          res.render("Add",{username:result[0].uname});
    });
});
Router.get("/campground",function(req,res)
{
    var IP=req.connection.remoteAddress;
    var user=req.headers["user-agent"];
    var validuser=encrypt(IP+""+user);
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
        conn.query("Select * from CampGround order by Name",function(error,result,fields)
        {  
              res.render("camp",{camp:result,state:state,username:uname,success:req.flash("success")});
        });   
    });              
});
Router.post("/campground",function(req,res)
{
  var IP=req.connection.remoteAddress;
  var user=req.headers["user-agent"];
  var validuser=encrypt(IP+""+user);
    var Name=req.body.name;
    var URL=req.body.url;
    var desc=req.body.desc;
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
    var query="Insert into CampGround values("+"'"+Name+"'"+","+"'"+URL+"'"+","+"'"+desc+"'"+","+"'"+uname+"'"+")";
    conn.query(query,function(error,result,fields)
    {
        if(error)
          console.log(error);
    });
   res.redirect("/campground");              
});
});
Router.get("/campground/:id",function(req,res)
{
    var IP=req.connection.remoteAddress;
    var user=req.headers["user-agent"];
    var validuser=encrypt(IP+""+user);
    var state="";
    var username="";
    conn.query("select * from state where IP='"+IP+"'"+"and sessid='"+validuser+"'",function(error,result,fields)
    {
        if(result.length==0)
          state="not logged in";
        else
        {  state="logged in";
          username=result[0].uname;
        } 
        var query="select * from CampGround C where C.Name="+"'"+req.params.id+"'";
        conn.query(query,function(error,campresult,fields)
        {
           conn.query("select * from Comments where CampName='"+req.params.id+"'",function(error,result,fields)
           {
             res.render("specific",{campres:campresult,state:state,username:username,commentres:result});
           });
        });      
    }); 
});
Router.get("/campground/:id/Update",function(req,res)
{
     conn.query("select * from CampGround",function(error,result,fields)
     {
         res.render("editcamp",{result:result});
     });    
});
Router.put("/campground/:id/Update",function(req,res)
{
    var IP=req.connection.remoteAddress;
  var user=req.headers["user-agent"];
  var validuser=encrypt(IP+""+user);
    var Name=req.body.name;
    var URL=req.body.url;
    var desc=req.body.desc;
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
    var query1="Update CampGround set URL='"+URL+"'"+"where Name='"+req.params.id+"'";
    var query2="Update CampGround set Description='"+desc+"'"+"where Name='"+req.params.id+"'";
    var query3="Update CampGround set Name='"+Name+"'"+"where Name='"+req.params.id+"'";
    conn.query(query1,function(error,result,fields)
    {
    });
    conn.query(query2,function(error,result,fields)
    {
    });
    conn.query(query3,function(error,result,fields)
    {
    });
    if(Name==req.params.id) 
     res.redirect("/campground/"+req.params.id);
    else
     res.redirect("/campground/"+Name);             
   });
});
Router.delete("/campground/:id/delete",function(req,res)
{
   conn.query("delete from CampGround where Name='"+req.params.id+"'",function(error,result,fields)
   {
   });
   res.redirect("/campground");
});

module.exports=Router;