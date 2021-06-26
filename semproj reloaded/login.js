$(function(){
    
    $(".loginbtn").click(login)
    
})
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

function login(){
    var Email = $(".logEinput").val();
    if (!isEmail($(".logEinput").val())){
        return alert("Enter a valid address please")
    }
    var Password = $(".logPinput").val();
    if ((Password.length)==0){
        alert("Password field cannot be empty")

    }
    $.ajax ({
        url:"http://localhost:4000/api/users/login",
        method:"POST",
        data:{Email,Password},
        success: function(response){
            console.log(response);
            $.ajax({
                url:"http://localhost:4000/api/users",
                method:"GET",
                success: function(response){
                    console.log(response);
                    for (var i = 0; i < response.length; i++){
                    if (((response[i].Email)==Email)&&(response[i].role=="admin")){
                        alert("Admin Mode Activated")
                        window.location.replace("./adminPanel.html");
                    }}
                    
                    
            }})
            alert("Logged in Successfully")
            window.location.replace("./main.html");
            
            },
            error: function () {
                alert("Invalid Credentials");
                
            }
        
        }
    )
}