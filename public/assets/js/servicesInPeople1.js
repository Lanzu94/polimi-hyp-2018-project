var div = document.getElementById("services");
var img = document.getElementById("image");
var name = document.getElementById("name");

var text_desc;
var p_role = document.getElementById("role");
var role_text;

$(window).ready(function () {
    console.log("READY");
    console.log(URL.id);
	$.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/person",
        data:{
            id: URL.id
        }, 
        success: function (response) {
            console.log(response);
            
            text_desc = document.createTextNode(response.people[0].description);
            role_text = document.createTextNode(response.people[0].role);

            var div_desc = document.getElementById("description");
            var p_desc = document.createElement("p");
            p_desc.setAttribute("class", "testo");
            p_desc.appendChild(text_desc);
            div_desc.appendChild(p_desc);
            p_role.appendChild(role_text);

            var img = document.getElementById("image");
            var name = document.getElementById("name");

            img.setAttribute("src", response.people[0].image);

            var name_content = document.createTextNode(response.people[0].name);
            var b = document.createElement("b");
            var h3 = document.createElement("h3");
            b.appendChild(name_content);
            h3.appendChild(b);
            name.appendChild(h3);

        for(var i = 0; i<response.services.length; i++){
            var primary_node = document.createElement("div");
            primary_node.setAttribute("class", "row");
            var node = document.createElement("div");

            var textnode = document.createTextNode(response.services[i].name);
            node.setAttribute("class", "col-xs-12 col-sm-6 col-md-6 col-lg-8");
            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("onclick", "location.href='./service1.html?id=" + response.services[i].id + "'");

            button.setAttribute("class", "btn btn-primary btn-block");
            button.appendChild(textnode);
            node.appendChild(button);
            primary_node.appendChild(node);

            div.appendChild(primary_node);
            }
        },
        error: function (request, error) {
            console.log(request, error);
        }
    });
});


var URL = function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
        query_string[pair[0]] = arr;
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    } 
    return query_string;
}();
