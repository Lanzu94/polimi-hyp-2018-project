

$(document).ready(function () {
	
    console.log("READY");
    
    //EXECUTE ASYNCHRONOUS JAVASCRIPT CALL
    $.ajax({
        method: "GET",
		dataType: "json",
		crossDomain: true,
        url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/location", //SERVER URL
        success: function (response) {
            console.log(response); //LOG RESPONSE
            loadData(response); //LOAD THE RESPONSE DATA IN HTML
        },
        error: function (request, error) {
            console.log(request, error);
        }
    });

});

var pd = document.getElementById("pannello");

function loadData(json) {
	var cont= document.createElement("div");
	cont.setAttribute("class", "panel-group");
	cont.setAttribute("id", "panel_group");
	
	for (var i = 0; i < json.location.length; i++) { //per ogni location ho un pannello con immagine, nome e città
		var node = document.createElement("div");
		node.setAttribute("class", "panel panel-default");
		
		var loc = document.createElement("div"); //creo il pannello cliccabile
		loc.setAttribute("class", "panel-body");
		
		var a= document.createElement("a");
		a.setAttribute("href", "./location1.html?id= "+json.location[i].id);
		var img_space=document.createElement("div"); //metto un div per l'immagine
		img_space.setAttribute("class", "col-xs-12 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-lg-5 col-lg-offset-0");
		var img = document.createElement("img");
		img.setAttribute("class", "normalizzata"); 
		img.setAttribute("src", json.location[i].img_path); 
		img_space.appendChild(img); // <div class="col-xs-12 ...> <img></div> 
		a.appendChild(img_space);
		
		var name= document.createElement("div"); //metto un div per nome e città
		name.setAttribute("class", "col-xs-12 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-lg-7 col-lg-offset-0");
		var h3 = document.createElement("h3");
		h3.setAttribute("class", "margini");
		var text_name= document.createTextNode(json.location[i].name);	
		h3.appendChild(text_name); //<h3>text_name</h3>
		var city_name= document.createTextNode(json.location[i].city);
		var h4 =document.createElement("h4");
		h4.appendChild(city_name); //<h4>text_name</h4>
		
		name.appendChild(h3); //<div class="col-xs-12 .."> <h3></h3> <h4></h4> </div>
		name.appendChild(h4);
		
		 //<div class="panel-body"> <div class="col-xs-12 ...> <div class="col-xs-12 .."> <h3></h3> <h4></h4> </div> </div>
		a.appendChild(name);	
		loc.appendChild(a);
		
		node.appendChild(loc);// <div class="panel"> <div class="panel-body"> </div> </div>	
		cont.appendChild(node);
			}
		pd.appendChild(cont);	
	
}
