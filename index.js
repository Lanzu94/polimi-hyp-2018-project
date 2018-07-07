const express = require('express')
const path = require('path')
const _la = require('lodash');

const {Client} = require('pg');
const app= express();
const PORT = process.env.PORT || 5000

const connectionString = process.env.DATABASE_URL || 'postgres://xevslnyexkxqbz:3e38c48902dee8bf98c164ac14000db0febd641fd290418e7cceba58213d14e8@ec2-54-217-214-68.eu-west-1.compute.amazonaws.com:5432/dd4qpg2lgkp8pe';

const client = new Client({
    connectionString: connectionString
});
client.connect();

app
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.render('public/'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get("/people", function(req, res){ 
  var json = {}
  var people = "people";
  let sort = _la.get(req, "query.sorting", "undefined");
  json[people] = [];
  if(sort !== 'undefined' && (sort === 'name' || sort === 'role')){
      let query = client.query('SELECT id, name, role, image FROM person ORDER BY ' + sort +' ASC', function(err, result){
          if(err){
              console.error(err);
              res.status(500).send();
          }else{
              if(result.rows.length > 0){
                  for(var i = 0; i< result.rows.length; i++){
                      var data = {id: result.rows[i].id, name: result.rows[i].name, role: result.rows[i].role, images: result.rows[i].image}
                      json[people].push(data);   
                }
              return res.json(json); 
           }
        }
    });
  }else{
    let query = client.query('SELECT id, name, role, image FROM person ORDER BY id ASC', function(err, result){
          if(err){
              console.error(err);
              res.status(500).send();
          }else{
              if(result.rows.length > 0){
                  for(var i = 0; i< result.rows.length; i++){
                      var data = {id: result.rows[i].id, name: result.rows[i].name, role: result.rows[i].role, images: result.rows[i].image}
                      json[people].push(data);   
                  }
                  return res.json(json); 
              }
          }
      });
  }
});

app.get("/person", function(req, res){
    var json = {}
    var people = "people";
    json[people] = [];
    let id = _la.get(req, "query.id", "undefined");
    var services = "services";
    json[services] = [];
    if(id === 'undefined'){
        console.error(err);
        res.status(500).send();
    }else{
    client.query("SELECT p.name AS pname, p.role, p.image, p.description, s.name AS serv, s.id FROM peopleinservice AS ps JOIN service AS s ON ps.service_id = s.id JOIN person AS p ON ps.person_id = p.id WHERE p.id = '"+ id + "'", function(err, result){
        if(err){
            console.error(err);
            res.status(500).send();
        }else{
            if(result.rows.length > 0){
                var p = {name: result.rows[0].pname, role: result.rows[0].role, image: result.rows[0].image, description: result.rows[0].description}
                json[people].push(p);
                for(var i=0; i<result.rows.length; i++){
                    var data = {id: result.rows[i].id, name: result.rows[i].serv}
                    json[services].push(data);
                    }
                return res.json(json);
                }
            }
        });
    }
});


app.get("/services", function (req, res) {
    var json = {}
    var services = "services";
    json[services] = [];
    let query = client.query('SELECT id, name, title FROM service ORDER BY id', function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send();
        } else {
            if (result.rows.length > 0) {
                for (var i = 0; i < result.rows.length; i++) {
                    var data = { id: result.rows[i].id, name: result.rows[i].name, title: result.rows[i].title }
                    json[services].push(data);
                }
                return res.json(json);
            }
        }
    });
});


app.get("/serv1", function (req, res) {

    var json = {}
    var service = "service";
    json[service] = [];
    var people = "people";
    json[people] = [];
    let id = _la.get(req, "query.id", "undefined");
    var location = "location";
    json[location] = [];
    var other = "other"
    json[other] = [];
    var contact = "contact";
    json[contact] = [];

    Promise.all([servForServ1(json[service], id), peopleForServ1(json[people], id), locationForServ1(json[location], id),
    otherForServ1(json[other], id), contactForServ1(json[contact], id)]).then(function (results) {
        json[service] = results[0];
        json[people] = results[1];
        json[location] = results[2];
        json[other] = results[3];
        json[contact] = results[4];
        res.json(json);
    }).catch(function (err) {
        console.error(err);
    });
});


app.get("/contact", function (req, res) {
    var json = {}
    var contact = "contact";
    json[contact] = [];

    client.query("SELECT id, description, email, phone, image FROM  contacts", function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send();
        } else {
            if (result.rows.length > 0) {
                for (var i = 0; i < result.rows.length; i++) {
                    var data5 = { id: result.rows[i].id, description: result.rows[i].description, email: result.rows[i].email, phone: result.rows[i].phone, image: result.rows[i].image }
                    json[contact].push(data5);
                }
                return res.json(json);
            }
        }

    });

});


app.get("/faq", function (req, res) {
    var json = {}
    var faq = "faq";
    json[faq] = [];

    client.query("SELECT question, answer FROM faq", function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send();
        } else {
            if (result.rows.length > 0) {
                for (var i = 0; i < result.rows.length; i++) {
                    var data5 = { question: result.rows[i].question, answer: result.rows[i].answer }
                    json[faq].push(data5);
                }
                return res.json(json);
            }
        }
    });
});

function servForServ1(json, id) {
    return new Promise(function (resolve, reject) {
        client.query("SELECT s.id as sid, s.name, s.description1, s.description2, s.description2_title FROM service as s WHERE s.id = '" + id + "'", function (err, result) {
            if (err) {
                console.error(err);
            } else {
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var p = { sid: result.rows[0].sid, name: result.rows[0].name, description1: result.rows[0].description1, description2: result.rows[0].description2, description2_title: result.rows[0].description2_title }
                        json.push(p);
                    }
                }
                resolve(json);
            }

        });
    });
}

function peopleForServ1(json, id) {
    return new Promise(function (resolve, reject) {
        client.query("SELECT person.id as pid, person.name as pname,person.role, person.image as p_img FROM service as s JOIN peopleinservice as ps on s.id =ps.service_id JOIN person on person.id = ps.person_id WHERE s.id = '" + id + "'", function (err, result) {
            if (err) {
                console.error(err);
            } else {
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var data1 = { pid: result.rows[i].pid, pname: result.rows[i].pname, role: result.rows[i].role, p_img: result.rows[i].p_img }
                        json.push(data1);
                    }
                }
                resolve(json);
            }
        });

    });
}

function locationForServ1(json, id) {
    return new Promise(function (resolve, reject) {
        client.query("SELECT l.id as lid, l.name as lname, l.city, l.image as loc_img FROM service as s JOIN serviceinlocation as sl on s.id = sl.service_id JOIN location as l ON l.id = sl.location_id WHERE s.id = '" + id + "'", function (err, result) {
            if (err) {
                console.error(err);
            } else {
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var data2 = { lid: result.rows[i].lid, lname: result.rows[i].lname, city: result.rows[i].city, loc_img: result.rows[i].loc_img }
                        json.push(data2);
                    }
                }
                resolve(json);
            }
        });
    });
}

function otherForServ1(json, id) {
    return new Promise(function (resolve, reject) {
        client.query("SELECT s2.id as ids , s2.name as names FROM service as s JOIN service as s2 on s.id != s2.id  WHERE s.id = '" + id + "'", function (err, result) {
            if (err) {
                console.error(err);
            } else {
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var data3 = { ids: result.rows[i].ids, names: result.rows[i].names }
                        json.push(data3);
                    }
                }

                resolve(json);
            }
        });
    });
}

function contactForServ1(json, id) {
    return new Promise(function (resolve, reject) {
        client.query("SELECT id , email, phone, image FROM contacts  WHERE id = '" + id + "'", function (err, result) {
            if (err) {
                console.error(err);
            } else {
                if (result.rows.length > 0) {
                    var data4 = { email: result.rows[0].email, phone: result.rows[0].phone, image: result.rows[0].image }
                    json.push(data4);
                }
                resolve(json);
            }
        });
    });
}

app.get("/location", function(req, res){ 
    var json = {}
    var location = "location";
    json[location] = [];
    let query = client.query('SELECT id, name, city, image FROM location ORDER BY id', function(err, result){
        if(err){
            console.error(err);
            res.status(500).send();
        }else{
            if(result.rows.length > 0){
                for (var i = 0; i < result.rows.length; i++) {
                var data = { id: result.rows[i].id, name: result.rows[i].name, city: result.rows[i].city, img_path: result.rows[i].image}
                json[location].push(data);
                }
                return res.json(json); 
            }
        }
    });
}); 

app.get("/location1", function(req, res){ 
    var json = {}
    var location = "location";
    json[location] = [];
    var dropdown ="dropdown";
    json[dropdown]=[];
    var gallery="gallery";
    json[gallery]=[];
    var services="services";
    json[services]=[];
    let id = _la.get(req, "query.id", "undefined");

    Promise.all([locForLoc1(json[location], id), dropForLoc1(json[dropdown], id) , galleryForLoc1(json[gallery], id), 
servForLoc1(json[services], id)]).then(function(results) {
        json[location] = results[0];
        json[dropdown] = results[1];
        json[gallery] = results[2];
        json[services] = results[3]; 
        res.json(json); 
    }).catch(function(err){
        console.error(err);
    });
}); 

function locForLoc1(json, id){
    return new Promise(function(resolve, reject){
        client.query("select name, description from location where id= '"+ id + "'", function(err, result){
            if(err){
                console.error(err);
            }else{
                if(result.rows.length > 0){
                    var data =  {name: result.rows[0].name, description: result.rows[0].description}
                    json.push(data);
                }
                resolve(json);
            }
           
        });
    });
}  

function  dropForLoc1(json, id){
    return new Promise(function(resolve, reject){
        client.query("select id, name from location where id<> '"+ id + "'", function(err, result){
            if(err){
                console.error(err);
            }else{
                if(result.rows.length > 0){
                    for (var i = 0; i < result.rows.length; i++) {  
                        var data1 = { ids: result.rows[i].id, names: result.rows[i].name }
                        json.push(data1);
                     }
                 }
                 resolve(json);  
            }
    
        }); 
    });
}  

function galleryForLoc1(json, id){
    return new Promise(function(resolve, reject){
        client.query("select g.url as slider from location as l join illustration as i on i.caller_id=l.id join gallery as g on g.id=i.img_id and l.id= '"+ id + "'", function(err, result){
            if(err){
                console.error(err);
            }else{
                if(result.rows.length > 0){
                    for (var i = 0; i < result.rows.length; i++) {  
                    var data2 = { slider: result.rows[i].slider}
                    json.push(data2);
                    }
            }
            resolve(json);  
        }
    
    });
    });
}        


function servForLoc1(json, id){
    return new Promise(function(resolve, reject){
        client.query("select s.name as services, s.id from location as l join serviceinlocation as sl on sl.location_id=l.id join service as s on s.id=sl.service_id where l.id= '"+ id + "'", function(err, result){
            if(err){
                console.error(err);
            }else{           
                if(result.rows.length > 0){
                    for (var i = 0; i < result.rows.length; i++) {  
                                var data3 = { id: result.rows[i].id, name: result.rows[i].services}
                                json.push(data3); 
                            }
                        }
                        resolve(json);
                }

            }); 
    });
}             




    app.get("/serviceByLocation", function(req, res){ 
	var json = {}
    var location = "location";
    json[location] = [];
    var numloc= "numloc";
    json[numloc]=[];
        let query = client.query('SELECT id, name, city FROM location ORDER BY city', function(err, result){
        if(err){
            console.error(err);
            res.status(500).send();
        }else{
            if(result.rows.length > 0){              
                for (var i = 0; i < result.rows.length; i++) {
                    var locpercity=1; 
                    for (var j=i+1; j>i && j< result.rows.length; j++){
                        if (result.rows[i].city==result.rows[j].city) {
                            locpercity++;
                        }    
                    } 
                    var data={ numloc: locpercity} 
                    json[numloc].push(data);
                    i=i+locpercity-1;
                }
                
                for (var i = 0; i < result.rows.length; i++) {
                    var data = { id: result.rows[i].id, name: result.rows[i].name, city: result.rows[i].city, img_path: result.rows[i].image}
                    json[location].push(data);
                    } 
                    return res.json(json); 
                }
                     
            }
        
    });
       
 }); 

 app.get("/servByLoc1", function(req, res){
	var json = {}
    var location = "location";
    json[location] = [];
    var services="services";
    json[services]=[];
    let id = _la.get(req, "query.id", "undefined");
    let query= client.query("select l.name, l.image, l.id, s.name as services, s.id as sid from location as l  join serviceinlocation as sl on sl.location_id=l.id join service as s on s.id=sl.service_id where l.id= '"+ id + "'", function(err, result){
        if(err){
            console.error(err);
            res.status(500).send();
        }else{
            if(result.rows.length > 0){
                var data =  { name: result.rows[0].name, id: result.rows[0].id, image: result.rows[0].image}
                json[location].push(data);
                for (var i = 0; i < result.rows.length; i++) {
                        var data1 = { id: result.rows[i].sid, name: result.rows[i].services}
                        json[services].push(data1);
                    } 
                
                return res.json(json);

            }
        }
    });

});    
