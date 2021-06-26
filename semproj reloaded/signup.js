$(function(){
    $(".Signupbtn").click(registerUser)
 

})
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
function registerUser(){
    console.log("saveclicked");
    if ($(".fnameinput").val().length===0){
        $(".fnameinput").addClass("red");
      return  alert("Please Enter First Name")

    }
    if ($(".lnameinput").val().length===0){
        $(".lnameinput").addClass("red");
        return  alert("Please Enter Last Name")
        
  
      }
      if ($(".emailinput").val().length===0){
        $(".emailinput").addClass("red");
        return  alert("Please Enter Your Email")
  
      }
     
      if (!isEmail($(".emailinput").val())){
          return alert("Enter a valid Email address please")
      }
      
      if ($(".passwordinput").val().length===0){
        $(".passwordinput").addClass("red");
        return  alert("Please Enter Your Password")
  
      }
      if ($(".passwordinput").val()!==$(".confirmpasswordinput").val()){
        $(".confirmpasswordinput").addClass("red");
        return  alert("Passwords Must Match")
  
      }
    $("input").removeClass("red");
    var FirstName = $(".fnameinput").val();
    var LastName = $(".lnameinput").val();
    var Email = $(".emailinput").val();
    var Password = $(".passwordinput").val();
    $.ajax({
        
        url:"http://localhost:4000/api/users/register",
        method:"POST",
        data:{FirstName,LastName,Email,Password},
        
        success:function (res) {
          
            alert("Account registered Successfully");
            window.location.replace("./login.html");
            
        },
        error: function () {
            alert("Email Already exists");
            
        }
    })
}