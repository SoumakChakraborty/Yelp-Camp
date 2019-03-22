function check()
{
    var y=document.querySelector("#cmpdesc");
    if(y.value=="")
     {
        alert("User cannot be empty");
        return false;
     }
    return true;
}