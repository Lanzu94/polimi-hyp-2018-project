var div = document.getElementById("coco");
var div1 = document.getElementById("peopleee");
var div2 = document.getElementById("text2");
var div3 = document.getElementById("location");
var drop = document.getElementById("myDropdown");
var titolo = document.getElementById("top");
var contact = document.getElementById("contacts");


$(document).ready(function () {
    console.log("READY");
    console.log(URL.id);
    people= $("#people");
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "https://polimi-hyp-2018-team-10428671.herokuapp.com/serv1", //URL
        data: {
            id: URL.id
        },
        success: function (response) {
            console.log(response); //LOG RESPONSE
            loadData(response); 
            
        },
		error: function (request, error) {
            console.log(request + ":" + error);

        }
    });
});




function loadData(json) {
	console.log(json);
    
    
    var name = document.createElement("h1");
    var b = document.createElement("b");
    var text6 = document.createTextNode(json.service[0].name);
    b.appendChild(text6);
    name.appendChild(b);
    titolo.appendChild(name);



	for (var i = 0; i < json.other.length; i++) {
	//if (!location_name.localeCompare(json.location[i].name)){
		var links= document.createElement("a");
		links.setAttribute("href", "./service1.html?id="+json.other[i].ids);
		var otherServ= document.createTextNode((json.other[i].names));
		links.appendChild(otherServ);
		drop.appendChild(links);	
	}	
  
    var testo = document.createTextNode(json.service[0].description1)
    div.appendChild(testo);

    for (var index = 0; index < json.people.length; index++) { 
        var node_a = document.createElement("div");
        node_a.setAttribute("class", "col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-0");
        node_a.setAttribute("align", "center");
        var node_b = document.createElement("a");
        node_b.setAttribute("href", "./people1.html?id=" + json.people[index].pid); //people sono i people id in service
        var node_c = document.createElement("img");
        node_c.setAttribute("class", "pers");
        node_c.setAttribute("src", json.people[index].p_img);
        node_b.appendChild(node_c);
        node_a.appendChild(node_b);
        var node_d = document.createElement("p");
        var node_e = document.createElement("b");
        var name = document.createTextNode(json.people[index].pname);
        node_e.appendChild(name);
        node_d.appendChild(node_e);
        node_a.appendChild(node_d);
        var node_f = document.createElement("p");
        var role = document.createTextNode(json.people[index].role);
        node_f.appendChild(role);
        node_a.appendChild(node_f);
       
        div1.appendChild(node_a);
    }
    
    var node_g = document.createElement("h2");
    var node_j = document.createElement("b");
    var text1 = document.createTextNode(json.service[0].description2_title);
    node_j.appendChild(text1);
    node_g.appendChild(node_j);
    div2.appendChild(node_g);
    var node_k = document.createElement("p");
    node_k.setAttribute("class", "testo");
    var text3 = document.createTextNode(json.service[0].description2);
    node_k.appendChild(text3);
    div2.appendChild(node_k);

    for (var j = 0; j < json.location.length; j++) {

        var node_l = document.createElement("div");
        node_l.setAttribute("class", "col-xs-12 col-sm-6");
        node_l.setAttribute("align", "center");
        var node_m = document.createElement("a");
        node_m.setAttribute("href", "./location1.html?id="+json.location[j].lid); //id delle location
        var node_n = document.createElement("img");
        node_n.setAttribute("class", "loc");
        node_n.src = json.location[j].loc_img;
        node_m.appendChild(node_n);
        node_l.appendChild(node_m);
        var node_o = document.createElement("p");
        var node_p = document.createElement("b");
        var text4 = document.createTextNode(json.location[j].lname);
        node_p.appendChild(text4);
        node_o.appendChild(node_p);
        node_l.appendChild(node_o);
        var node_q = document.createElement("p");
        var text5 = document.createTextNode(json.location[j].city);
        node_q.appendChild(text5);
        node_l.appendChild(node_q);
        div3.appendChild(node_l); 

        } 
        
    var node_1 = document.createElement("div");
    node_1.setAttribute("class", "col-xs-6 col-sm-3 col-lg-2");
    var node_2 = document.createElement("img");
    node_2.setAttribute("class", "img-circle");
    node_2.setAttribute("src", json.contact[0].image);
    node_1.appendChild(node_2);
    contact.appendChild(node_1);
    var node_3 = document.createElement("div");
    node_3.setAttribute("class", "col-xs-12 col-sm-9 col-lg-4");
    var node_text1 = document.createTextNode(json.contact[0].email);
    node_3.appendChild(node_text1);
    var p = document.createElement("p");
    var node_text2 = document.createTextNode(json.contact[0].phone);
    p.appendChild(node_text2);
    node_3.appendChild(p);
    contact.appendChild(node_3);

}


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