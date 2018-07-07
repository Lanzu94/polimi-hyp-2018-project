var div = document.getElementById("services");

$(document).ready(function () {
	console.log("READY");
	console.log(URL.sorting);
	$.ajax({
        method: "GET",
		dataType: "json",
		crossDomain: true,
		url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/people",
		data:{
        	sorting: URL.sorting
        }, 
        success: function (response) {
			console.log(response); 
			console.log(response.people);
			console.log(response.people[0].id);
			console.log(response.people[0].name);
			console.log(response.people[0].role);
			console.log(response.people[0].images);
            loadData(response);
        },
        error: function (request, error) {
            console.log(request, error);
        }
    });
});


function loadData(json){

	console.log(json);
	console.log(json.people);
	console.log(json.people[0].id);
	console.log(json.people[0].name);
	console.log(json.people[0].role);

	for(var j=0; j<2; j++){

	var primary_node = document.createElement("div"); 
	primary_node.setAttribute("class", "row");

	for(var i=0; i<4; i++){ 
	
		var node = document.createElement("div");
		node.setAttribute("class", "col-xs-6 col-sm-5 col-md-5 col-lg-3 card");
		var pers = document.createElement("div");
		var ind = i+(j*4); 
		var ind1 = ind+1;

		pers.setAttribute("id", "p"+ind1);	
		pers.setAttribute("class", "people_border");
		pers.setAttribute("onclick", "location.href='./people1.html?id="+json.people[ind].id+"'");
		var p = document.createElement("p");
		var img = document.createElement("img");
		img.setAttribute("id", "img"+ind1);
		img.src = json.people[ind].images; 
		p.appendChild(img); 
		
		var container = document.createElement("div");
		container.setAttribute("class", "container");
		var p2 = document.createElement("h4");	
		p2.setAttribute("class", "text-left people_name");
		var b2 = document.createElement("b");
		var textname = document.createTextNode(json.people[ind].name);
		b2.appendChild(textname);
		p2.appendChild(b2);
		
		var p3 = document.createElement("h5");
		p3.setAttribute("class", "testo role_name");

		var textrole = document.createTextNode(json.people[ind].role);
		p3.appendChild(textrole);
 
		container.appendChild(p2);
		container.appendChild(p3);  
		
		pers.appendChild(p);	
		pers.appendChild(container); 
		node.appendChild(pers);	
		primary_node.appendChild(node);	
	
	}

	div.appendChild(primary_node); 

}

}

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