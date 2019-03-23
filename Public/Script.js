var list=document.querySelectorAll(".userlist");
var username=document.querySelector("#username");
var use=document.querySelector("body");
var x=false;
username.addEventListener("click",function()
{
      if(x==false)
      {
        for(var i=0;i<list.length;i++)
        {
            list[i].classList.remove("userlist");
            list[i].classList.add("showuserlist");
        }
       x=true;
      }
     else
     {
        for(var i=0;i<list.length;i++)
        {
            list[i].classList.remove("showuserlist");
            list[i].classList.add("userlist");
        }
       x=false;
    }
});
