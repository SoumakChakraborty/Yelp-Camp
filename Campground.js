var mysql=require("mysql");
    module.exports=mysql.createConnection({
        host:"yelpcamp.mysql.database.azure.com",
        port:"3306",
        user:"Soumak@yelpcamp",
        password:"Windows90#",
        database:"YelpCamp",
        ssl:true
});