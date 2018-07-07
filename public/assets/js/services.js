$(document).ready(function () {
    console.log("READY");

    //EXECUTE ASYNCHRONOUS JAVASCRIPT CALL
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/services", //SERVER URL
        success: function (response) {
            console.log(response); //LOG RESPONSE
            loadData(response); //LOAD THE RESPONSE DATA IN HTML
        },
        error: function (request, error) {
            console.log(request, error);
        }
    });

});

var div = document.getElementById("servicebutton");

function loadData(json) {


    for (var i = 0; i < json.services.length ; i++) { 
        var node = document.createElement("button");
        node.setAttribute("class", "btn btn-lg btn-primary btn-block");
        node.setAttribute("type", "button");
        node.setAttribute("onclick", "location.href='./service1.html?id="+ json.services[i].id+"'");
        node.setAttribute("title", json.services[i].title);

        var b = document.createElement("b");
        var testo = document.createTextNode(json.services[i].name);
        b.appendChild(testo);
        node.appendChild(b);

        div.appendChild(node);

    }

}