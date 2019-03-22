function check()
{
    var x=document.querySelector("#cmpname");
    var y=document.querySelector("#cmpurl");
    if(x.value==""&&y.value=="")
    {
     alert("Both the fields are empty");
     return false;
    }
    else if(x.value==""&&y.value!="")
    {
     alert("Campground name cannot be empty");
     return false;
    }
     else if(x.value!=""&&y.value=="")
     {
        alert("Campground url cannot be empty");
        return false;
     }
    return true;
}