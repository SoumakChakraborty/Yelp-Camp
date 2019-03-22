var body=document.querySelector("body");
var list=["welcome1","welcome2","welcome3","welcome4"];
var count=1;
setInterval(function()
            {
            if(count>0)
            {      
             body.classList.remove(list[count-1]);   
             body.classList.add(list[count]);
            }
            else
            {
                  body.classList.remove(list[list.length-1]);
                  body.classList.add(list[count]);  
            }
          count=(count+1)%list.length;
},12000);