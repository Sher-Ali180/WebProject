
$(function(){
    $("#Fetch").on("click","#delbtn",deleteInfo)
   $("#addbtn").click(handleAdd) 
    loadData();
    $("#upbtn").click(updateInfoform)
    $("#Addme").click(addMe)
    
    
})
function handleAdd(){
    window.location.replace("./addRecord.html");
}
function addMe(){
   
   console.log("m clicked")
    var Name = $("#addName").val();
    var Email = $("#addEmail").val();
    var Company = $("#addCompany").val();
    var Icon = $("#addUrl").val();
    var Type = $("#addType").val();
    var Price = $("#addPrice").val();
    $.ajax({
        url:"http://localhost:4000/api/gameaccs",
        method:"POST",
        headers:{
            'X-Auth-Token':token

        },
        data:{Name,Email,Company,Icon,Type,Price},
        success:function () {
            alert("Record Inserted Successfully")
            window.location.replace("./adminPanel.html");
}
 } )}
let token = localStorage.getItem('token')

function loadData(){
    $.ajax ({
        url:"http://localhost:4000/api/gameaccs",
        method:"GET",
        headers:{
            'X-Auth-Token':token

        },
        success: function(response){
            console.log(response);
            var temp = $("#Fetch");
            temp.empty();
            for (var i = 0; i < response.length; i++){
                var rec = response[i];
                    
                temp.append(`<div class = "comingData" data-id = "${rec._id}"><a class = "comingLabels" href="#Fetch"><h3 class = "comingnames"> ${rec.Name}</h3></a><br><img class = "comingImg" src="${rec.Icon}"/><button id = "delbtn">Delete Record</button></div>`)
                console.log(rec._id)
            }
        }
    })
}
function updateinfocall()
{
    let info = updateInfoform();
    console.log(info)

}
function updateInfoform(){
    $("#form1").show();
    console.log("m clicked")
    var label = $(this);
    var parentDiv = label.closest(".comingData");
    let dataid = parentDiv.attr("data-id");
    var Name = $("#formname").val();
    var Email = $("#formemail").val();
    var Company = $("#formcompany").val();
    var Icon = $("#formurl").val();
    var Type = $("#formacctype").val();
    
    let Info = [Email,Company,Icon,Type,dataid]
    return Info

}
function deleteInfo(){
    console.log("m clicked")

    var label = $(this);
    var parentDiv = label.closest(".comingData");
    let dataid = parentDiv.attr("data-id");
    console.log(dataid)
    $.ajax({
        url:"http://localhost:4000/api/gameaccs/"+dataid,
        method:"DELETE",
        headers:{
            'X-Auth-Token':token

        },
        success: function(response){
          loadData();
        }
    });

}

function handleInfo(){
    
    var label = $(this);
    var parentDiv = label.closest(".comingData");
    let dataid = parentDiv.attr("data-id");
    console.log(dataid)
    $.ajax({
        url:"http://localhost:4000/api/gameaccs/"+dataid,
        method:"GET",
        headers:{
            'X-Auth-Token':token

        },
        success: function(response){
            var temp = $("#Fetch");
            temp.empty();
            var rec = response;
            temp.html(`<div class = "comingData" data-id = "${rec._id}"><a class = "comingLabels" href="#Fetch"><h3 class = "comingnames"> ${rec.Name}</h3></a><br><img class = "comingImg" src="${rec.Icon}"/><h5 class = "comingCompany">Developers: ${rec.Company}</h5><h5 class = "comingType">Account Type: ${rec.Type}</h5><br><h5 class = "comingPrice">Price: ${rec.Price}</h5><p>Contact Seller at the provided Email:</p> <h4 class = "comingEmails">${rec.Email}</h4><button id = "delbtn">Delete Record</button>----<button id = "upbtn">Update Record</button></div>`)
        }
    });

}


function addData(){
    console.log("saveclicked");
    var email = $("#titleinput").val();
    var password = $("#bodyinput").val();
    $.ajax({
        url:"http://localhost:4000/api/users/register",
        method:"POST",
        data:{email,password},
        success:function () {
            loadData();


            
        }
    })
}
function handleDelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".comingData");
    let dataid = parentDiv.attr("data-id");
    console.log(dataid)
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+dataid,
        method:"DELETE",
        success: function(response){
            loadData();
        }
    });

}
function show() {
    $("#inputdiv").show()
    
}
function handlesingle(){
    var id=$("#idinput").val();
    console.log(id);
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"GET",
        success: function(response){
            console.log(response);
            var temp = $("#Fetch");
            temp.empty();
            var rec = response;
            temp.html(`<div class = "comingData" data-id = "${rec._id}"><h3> ${rec.title} </h3><br><p> ${rec.body}</p></div>`)
            }
        }
        
    );

    
}
