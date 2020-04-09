
  $(".add-form").hide();
  $(".edit-form").hide();
  $(function(){


        $(".add-images").click(function(){


                $(".add-form").toggle();

        });

        
        $(".buttons").hide();
       $(".images").on({

          mouseenter: function(){

                $(".buttons").show(2000);

          },
          mouseleave: function(){

              $(".buttons").hide(10000);

         }
     

       });
     

});


var imagesObject;
var currentImage;
var images;

readJson();



function readJson(){
  
     if(localStorage.getItem("images") === null){
          
        
         
          imagesObject=photos["images"];

          localStorage.setItem("images",JSON.stringify(imagesObject));
     
          

     }
     else if(localStorage.getItem("images") !== null)
     {
         
          imagesObject=JSON.parse(localStorage.getItem("images") || "[]");

     }

    loadImages();

}




function addImage(){
  
    if(!validateForAdd()){

        alert("Not Valid Input entered in Form Fields");
        return false;

    }
    

    
    var currImgObject= { name: $("#imagename-add").val(), url: $("#url-add").val() ,info: $("#info-add").val() , uploadedDate : $("#date-add").val()  };
   
    
   
    imagesObject.push(currImgObject);
    localStorage.setItem("images",JSON.stringify(imagesObject));
   
    
    loadImages();
    
    alert("Image added successfully");

}





function loadImages(){

 
     images=imagesObject;
  
  $(".images").empty();

    for(var i=0;i<images.length;i++){

        var tmp=images[i].url;
        
        $(".images").append("<div><img src=" + tmp + " width=\"200px\" height=\"200px\" id=\"a\"><div class=\"buttons\"><button class=\"edit-button\" onclick='imageClickHandler("+ i +")' type=\"submit\">&nbspEdit Image</button><button class=\"remove-button\" onclick='deleteImage("+ i +")' type=\"submit\">&nbspDelete Image</button></div></div>");

    }

}

function imageClickHandler(i){



     $(".edit-form").toggle();

    currentImage=i;
    setFormFields();



}

function setFormFields(){



     var i=currentImage;
  
  
     $("#url-edit").val(imagesObject[i]["url"]);
     $("#imagename-edit").val(imagesObject[i]["name"]);
     $("#info-edit").val(imagesObject[i]["info"]);
     $("#date-edit").val(imagesObject[i]["uploadedDate"]);
  
  
  
}
  

function editImage(){



          if(!validateForEdit()){

               alert("Entered input is not valid");
               return false;

          }

          imagesObject[currentImage]["url"]=$("#url-edit").val();
          imagesObject[currentImage]["name"]=$("#imagename-edit").val();
          imagesObject[currentImage]["info"]=$("#info-edit").val();
          imagesObject[currentImage]["uploadedDate"]=$("#date-edit").val();

          localStorage.setItem("images",JSON.stringify(imagesObject));
          
   

          alert("Image edited successfully");
          



}

function deleteImage(i){


          currentImage=i;
          if(confirm("Do you really want to Delete?")){
               imagesObject.splice(currentImage,1);
          }

          localStorage.setItem("images",JSON.stringify(imagesObject));

          loadImages();
          alert("Image deleted successfully");



}


function validateForAdd(){


       var name=document.getElementById("imagename-add").value;
       var url=document.getElementById("url-add").value;
       var info=document.getElementById("info-add").value;
       var date=document.getElementById("date-add").value;



       var enteredDate=new Date(date);

       var todayDate=new Date();



       var nameRegex= /^[a-zA-Z0-9. ]+$/g;
       
       var dateRegex = /^\d{4}-\d{2}-\d{2}$/;


       if(!nameRegex.test(name) || name.length==0){

                alert("Entered Image name is invalid");
                return false;
       }
       if(url.length==0){
                alert("URL cannot be empty");
                return false;

       }
       if(!dateRegex.test(date) || date.length==0){

            alert("Entered date is invalid");
            return false;
       }

       if(enteredDate > todayDate){
            alert("You cannot upload in a future date");
            return false;
       }

       if(info.length==0){

            alert("information cannot be empty");
            return false;
       }
       return true;
}

function validateForEdit(){


  var name=document.getElementById("imagename-edit").value;
  var url=document.getElementById("url-edit").value;
  var info=document.getElementById("info-edit").value;
  var date=document.getElementById("date-edit").value;



  var enteredDate=new Date(date);

  var todayDate=new Date();



  var nameRegex= /^[a-zA-Z0-9. ]+$/g;
  var urlRegex= /^[a-zA-Z0-9./$+()%&!@#$ ]+$/g;
  var dateRegex = /^\d{4}-\d{2}-\d{2}$/;


  if(!nameRegex.test(name) || name.length==0){

           alert("Entered Image name is invalid");
           return false;
  }
  if(!urlRegex.test(url) || url.length==0){
           alert("Entered URL is invalid");
           return false;

  }
  if(!dateRegex.test(date) || date.length==0){

       alert("Entered date is invalid");
       return false;
  }

  if(enteredDate > todayDate){
       alert("You cannot upload in a future date");
       return false;
  }

  if(info.length==0){

       alert("information cannot be empty");
       return false;
  }
  return true;
}








