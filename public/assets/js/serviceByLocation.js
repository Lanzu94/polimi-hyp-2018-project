$(document).ready(function () {
    console.log("READY");
    
    //EXECUTE ASYNCHRONOUS JAVASCRIPT CALL
    $.ajax({
        method: "get",
		dataType: "json",
		crossDomain: true,
        url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/serviceByLocation", //SERVER URL
        success: function (response) {
            console.log(response); //LOG RESPONSE
            loadData(response); //LOAD THE RESPONSE DATA IN HTML
        },
        error: function (request, error) {
            console.log(request, error);
        }
    });

});


function loadData(json) {

	var div = document.getElementById("accordion");
	var pannello = document.createElement("div");
	pannello.setAttribute("class", "panel-group");
	var ind=0;
	for(var i=0; i<json.numloc.length; i++){ //pannelli con l'elenco delle locations
			var teta= ind;
			if (json.numloc[i].numloc>1){ //indice della città da andare a vedere
				ind=json.numloc[i].numloc-1+ind;
			}
			var panel= document.createElement("div");
			panel.setAttribute("class", "panel panel-primary");	

			var panel_heading=  document.createElement("div");
			panel_heading.setAttribute("class", "panel-heading");

			var h2= document.createElement("h2");
			h2.setAttribute("class", "panel-title");

			var citta = document.createElement("a");
			citta.setAttribute("data-toggle","collapse");
			citta.setAttribute("data-parent", "#accordion");
			citta.setAttribute("href", "#collapse"+i);

			var citext= document.createTextNode(json.location[ind].city);
			citta.appendChild(citext); //<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Milano</a>
			h2.appendChild(citta); //<h2 class="panel-title"> <a data-toggle="collapse" ...>Milano</a> </h2>
			panel_heading.appendChild(h2); //aggiungo al panel-heading
			panel.appendChild(panel_heading);
			
			var elenco= document.createElement("div"); //elenco delle location ordinate per citta
			elenco.setAttribute("id", "collapse"+i);
			elenco.setAttribute("class", "panel-collapse collapse");

			for (var j=0; j<json.numloc[i].numloc; j++){ //metto tutte le location della stessa citta

				var panel_body= document.createElement("div");
				panel_body.setAttribute("class", "panel-body");

				var link= document.createElement("a");
				var k=teta+j;
				link.setAttribute("href", "./serviceByLoc1.html?id="+json.location[k].id); //devo avere i link di service by locationX

				var b= document.createElement("b");
				var nome= document.createTextNode(json.location[k].name);
				b.appendChild(nome);
				link.appendChild(b);
				panel_body.appendChild(link);
				elenco.appendChild(panel_body);
				
			}
			panel.appendChild(elenco); 
			pannello.appendChild(panel);
			
		ind++;
	} 
	div.appendChild(pannello);
}
	