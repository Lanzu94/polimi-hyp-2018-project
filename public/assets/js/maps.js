function myMap() {
var mapOptions = {
    center: new google.maps.LatLng(45.644736, 9.239791),
    zoom: 9,
    mapTypeId: google.maps.MapTypeId.HYBRID
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var sanMatteo = {lat:45.196802, lng:9.148837};
var niguarda = {lat:45.509547, lng:9.188751};
var gerardo = {lat:45.600940, lng:9.260346};
var materGratiae = {lat:45.441164, lng:9.196351};
var anffas = {lat:46.027314, lng:9.206996};

var marker1 = new google.maps.Marker({
          position: sanMatteo,
          map: map,
          title: 'Policlinico San Matteo'
        });



var marker2 = new google.maps.Marker({
          position: niguarda,
          map: map,
          title: 'Ospedale Niguarda'
        });


var marker3 = new google.maps.Marker({
          position: gerardo,
          map: map,
          title: 'Ospedale San Gerardo'
        });

var marker4 = new google.maps.Marker({
          position: materGratiae,
          map: map,
          title: 'Residenza per Disabili Mater Gratiae'
        });

var marker5 = new google.maps.Marker({
          position: anffas,
          map: map,
          title: 'Anffas Centro Lario E Valli'
        });
/*
*/

}