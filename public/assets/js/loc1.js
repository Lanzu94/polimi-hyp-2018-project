 // per muoversi nella galleria
var slideIndex = 1;

$(window).ready(function () {
	console.log("READY");
    console.log(URL.id);
     //LOG THE ID OF THE LOCATION FROM THE PAGE URL

	
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/location1",
        data: {
            id: URL.id //SEND THE ID OF THE LOCATION TO THE SERVER TO RETRIVE ONLY THOSE DATA
        },
        success: function (response) {
			console.log(response);
			
			loadData(response); 
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });

});

var drop = document.getElementById("myDropdown");

var container = document.getElementById("dinamic_loc");


function loadData(json) {
	
    
	
	for (var i=0; i<json.dropdown.length; i++){ //metto nel dropdown tutte le location tranne quella attuale (le ricevo già così dal jason)

			var links= document.createElement("a");
			links.setAttribute("href", "./location1.html?id= "+json.dropdown[i].ids);
			var otherLoc= document.createTextNode(json.dropdown[i].names);
			links.appendChild(otherLoc);
			drop.appendChild(links);
	} 
	
	//CONTENUTO DELLA PAGINA
	var pop= document.createElement("div");
	var b= document.createElement("b"); //<b>name </b>
	var name=document.createTextNode(json.location[0].name);
	b.appendChild(name);
	var h1=document.createElement("h1");
	h1.setAttribute("class", "titolo400");
	h1.setAttribute("id", "servloc1");
	h1.appendChild(b); //<h1 id="servloc1" class="titolo400"><b> name</b></h1>
	pop.appendChild(h1);

	
	var desc= document.createElement("p");
	desc.setAttribute("class", "testo"); //<p class="testo">Niguarda is a large national generalist public hospital...</p> 
	var text= document.createTextNode(json.location[0].description);
	desc.appendChild(text); 
	pop.appendChild(desc);

	container.appendChild(pop);

	
	//Gallery
	var cont= document.createElement("div");  //container per gallery
	cont.setAttribute("class","container");
	
	for (var j=0; j< json.gallery.length; j++){ //PRENDO TUTTE LE SLIDES
		var slide= document.createElement("div");
		slide.setAttribute("class","mySlides");
		var ind=j+1;
		var text_numb= document.createTextNode(ind+"/"+json.gallery.length); //<div class="numbertext">1 / 6</div>
		var numb= document.createElement("div");
		numb.setAttribute("class", "numbertext");
		numb.appendChild(text_numb);
		slide.appendChild(numb);
		
		var img = document.createElement("img"); //<div class="mySlides"><div class="numbertext">1 / 6</div><img src="../assets/img/l1.jpg" style="width:100%"></div>
		img.setAttribute("src", json.gallery[j].slider);
		img.setAttribute("style", "width:100%");
		slide.appendChild(img);
		
		cont.appendChild(slide); //aggiungo la slide al container della galleria		
	}
	
	
	//pulsanti next, previous
	var pre= document.createElement("a");
	pre.setAttribute("class", "prev");
	pre.setAttribute("onclick", "plusSlides(-1)");
	var pre_text= document.createTextNode("<");
	pre.appendChild(pre_text);
	cont.appendChild(pre);
	
	var next= document.createElement("a");
	next.setAttribute("class", "next");
	next.setAttribute("onclick", "plusSlides(1)");
	var next_text= document.createTextNode(">");
	next.appendChild(next_text);
	cont.appendChild(next); 

	//<!-- Thumbnail images --> 
	var tumb = document.createElement("div");
	tumb.setAttribute("class", "row");
	tumb.setAttribute("class", "sparisce");
	for (var k=0; k< json.gallery.length; k++){
	
		//immaginette nella riga
		var col= document.createElement("div"); //<img class="demo cursor" src="../assets/img/l1n.jpg" style="width:100%" onclick="currentSlide(1)">
		col.setAttribute("class", "column");
		var imm= document.createElement("img");
		imm.setAttribute("class", "demo" );
		imm.setAttribute("class", "cursor" );
		var ind=k+1;
		imm.src= json.gallery[k].slider;
		imm.setAttribute("style", "width:100%");
		imm.setAttribute("onclick", "currentSlide("+ind+")");
		col.appendChild(imm); //<div class="column"><img class="demo cursor" ...> </div>
		tumb.appendChild(col); //aggiungo la colonna alla riga
	}
	cont.appendChild(tumb); //aggiungo la tumbnail alla pag
	container.appendChild(cont);

	
	var serv = document.getElementById("serviceinlocX");
	//SERVIZI 
	for (var t=0; t<json.services.length; t++){ //services={serv1name, serv2name, ..} x avere due colonne x riga anche se + servizi
		
		var buttspace= document.createElement("div"); //colonne per i bottoni dei servizi
		buttspace.setAttribute("class", "col-sm-6 col-xs-6 ");
		var butt= document.createElement("button"); 
		butt.setAttribute("type", "button");
		butt.setAttribute("onclick", "location.href='./service1.html?id="+ json.services[t].id+"'");
		butt.setAttribute("class", "btn btn-primary btn-block");
		var b= document.createElement("b");
		var nameserv=document.createTextNode(json.services[t].name);
		b.appendChild(nameserv);//<b> Health Service</b>
		butt.appendChild(b); //<button> <b> </> </button>
		buttspace.appendChild(butt);
		serv.appendChild(buttspace);
		
		}

		showSlides(slideIndex);
		
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




// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
  
}

function showSlides(n) {
	
  var i;
  var slides = document.getElementsByClassName("mySlides");
 
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slides[slideIndex-1].style.display = "block";
  
} 