var alfa = document.getElementById("accordion");

$(document).ready(function () {
    console.log("READY");
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/faq", //URL
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
    var a1 = document.createElement("div");
    a1.setAttribute("class", "panel panel-primary");

    for( var i=0; i<json.faq.length;i++){
        var index = i+1;
        var a2 = document.createElement("div");
        a2.setAttribute("class", "panel-heading");
        var a3 = document.createElement("h4");
        a3.setAttribute("class","panel-title");
        var a4 = document.createElement("a");
        a4.setAttribute("class", "accordion-toggle");
        a4.setAttribute("data-toggle", "collapse");
        a4.setAttribute("data-parent", "#accordion");
        a4.setAttribute("href", "#pannello-"+index);
        var a5 = document.createElement("b");
        var t1 = document.createTextNode(json.faq[i].question);
        a5.appendChild(t1);
        a4.appendChild(a5);
        a3.appendChild(a4);
        a2.appendChild(a3);
        a1.appendChild(a2);
        var a6 = document.createElement("div");
        a6.setAttribute("id", "pannello-"+index);
        a6.setAttribute("class", "panel-collapse collapse");
        var a7 = document.createElement("div");
        a7.setAttribute("class","panel-body");
        var a8 = document.createElement("p");
        var t2 = document.createTextNode(json.faq[i].answer);
        a8.appendChild(t2);
        a7.appendChild(a8);
        a6.appendChild(a7);
        a1.appendChild(a6);

    }
    alfa.appendChild(a1);
    }





