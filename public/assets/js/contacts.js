var beta = document.getElementById("beta");

$(document).ready(function () {
    console.log("READY");
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/contact", //URL
        data: {
            id: URL.id
        },
        success: function (response) {
            console.log(response); //LOG RESPONSE
            
            loadData(response); 

        }
    });
});

function loadData(json) {


    for (var i=0 ; i< json.contact.length; i++){
        
        var d1 = document.createElement("div");
        d1.setAttribute("class", "col-xs-12 col-sm-12 col-md-6 col-lg-6");
        
        var d2 = document.createElement("div");
        d2.setAttribute("class", "col-xs-12 col-sm-3 col-md-4 col-lg-3 iconservice");
        var d3 = document.createElement("a");
        d3.setAttribute("href", "./service1.html?id=" + json.contact[i].id);
        var d4= document.createElement("img");
        d4.setAttribute("class", "img-circle");
        d4.setAttribute("src", json.contact[i].image);
        d3.appendChild(d4);
        d2.appendChild(d3);
        d1.appendChild(d2);
        
        var d5 = document.createElement("div");
        d5.setAttribute("class","col-xs-12 col-sm-9 col-md-8 col-lg-9 iconservice")
        var d6 = document.createElement("p");
        var d_text1 = document.createTextNode(json.contact[i].email);
        d6.appendChild(d_text1);
        d5.appendChild(d6);
        var d7 = document.createElement("p");
        var d_text2 = document.createTextNode(json.contact[i].phone);
        d7.appendChild(d_text2);
        d5.appendChild(d7);
       
        d1.appendChild(d5);

        beta.appendChild(d1);
    }
}
