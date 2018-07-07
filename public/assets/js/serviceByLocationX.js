$(window).ready(function () {
    console.log("READY");
    console.log(URL.id);
    //EXECUTE ASYNCHRONOUS JAVASCRIPT CALL
    $.ajax({
        method: "GET",
        crossDomain: true,
        dataType: "json",
        url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/servByLoc1", //SERVER URL
        data: {
            id: URL.id //SEND THE ID OF THE LOCATION TO THE SERVER TO RETRIVE ONLY THOSE DATA
        },
        success: function (response) {
            console.log(response); //LOG RESPONSE
            loadData(response); //LOAD THE RESPONSE DATA IN HTML
        },
        error: function (request, error) {
            console.log(request, error);
        }
    });

});

var sli= document.getElementById("sli");
var space_but= document.getElementById("space_but");
var titolo= document.getElementById("servloc1");

function loadData(json) {
    console.log(json);
    
    var b = document.createElement("b"); //TITOLO
	var nomeLoc = document.createTextNode(json.location[0].name);
    b.appendChild(nomeLoc);
    titolo.appendChild(b);
	
    
	var img= document.createElement("img"); //immagine
	img.src= json.location[0].image;
	img.setAttribute("class", "img-thumbnail");
	var a=document.createElement("a");
	a.setAttribute("href", "./location1.html?id="+json.location[0].id);
    a.appendChild(img);
	sli.appendChild(a);
	
	 						
	for (var i=0; i<json.services.length; i++){

		var but_space= document.createElement("div");
        but_space.setAttribute("class", "col-xs-12 col-sm-6 col-md-6 col-lg-8");
       // for (var j=0; j<2; j++){
		var bottoni= document.createElement("button");
		bottoni.setAttribute("class", "btn btn-primary btn-block");
        bottoni.setAttribute("type", "button");
		bottoni.setAttribute("onclick", "location.href='./service1.html?id="+ json.services[i].id+"'");
        var b= document.createElement("b");
        var nome=document.createTextNode(json.services[i].name);
		b.appendChild(nome);
        bottoni.appendChild(b);
       // }
		space_but.appendChild(bottoni);	
		}
	
 }
 
 //URL
var URL = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();