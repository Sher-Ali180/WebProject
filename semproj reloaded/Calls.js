$(function(){
    $("#Fetch").on("click","#delbtn",deleteInfo)
    $("#Fetch").on("click",".comingLabels",handleInfo)
    loadData();
    $("#upbtn").click(updateInfoform)
    
    
    
})

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
                    
                temp.append(`<div class = "comingData" data-id = "${rec._id}"><a class = "comingLabels" href="#Fetch"><h3 class = "comingnames"> ${rec.Name}</h3></a><br><img class = "comingImg" src="${rec.Icon}"/></div>`)
                console.log(rec._id)
            }
        }
    })
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
            temp.html(`<div class = "comingData" data-id = "${rec._id}"><a class = "comingLabels" href="#Fetch"><h3 class = "comingnames"> ${rec.Name}</h3></a><br><img class = "comingImg" src="${rec.Icon}"/><h5 class = "comingCompany">Developers: ${rec.Company}</h5><h5 class = "comingType">Account Type: ${rec.Type}</h5><br><h5 class = "comingPrice">Price: ${rec.Price}</h5><p>Contact Seller at the provided Email:</p> <h4 class = "comingEmails">${rec.Email}</h4></div>`)
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
