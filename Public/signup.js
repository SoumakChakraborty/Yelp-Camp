function check()
{
  var first=document.querySelector("#password");
  var second=document.querySelector("#retype");
  if(first.value!=""&&second.value!="")
  {
    if(first.value==second.value)
      return true;
    else
    {
      alert("Passwords do not match");
      return false;
    }
  }
  else
   return false;
}