# polimi-hyp-2018-project
A website for an association that deals with people with disabilieties
Heroku app: http://polimi-hyp-2018-team-10428671.herokuapp.com/

Bitbucket repo: https://bitbucket.org/polimihyp2018team10428671/polimi-hyp-2018-project/src/master/
Authors

    Joshua Nicolay Ortiz Osorio - 10428671 - alius36, Alius
    Valentina Lanzuise - 10424257 - LANZUISE VALENTINA
    Simone Lazzaretti - 10433423 - Simone EvilPrince

How we worked

As professor Mirko Gelsomini needed to evaluate front-end part, we couldn't push client code on the official Git folder, so we started owr project on other two different non-official repositories: one on Bitbucket (https://bitbucket.org/rawny36/testproject/src/master/) and another one always on Heroku where all the push were made with Herok-CLI (credentials to access it: simone.lazzaretti@mail.polimi.it (email address), Evilprince94@ (password), then click on project 'mypolimitest')

    Joshua Nicolay Ortiz Osorio mainly works on Service, Service1, Contacts, Faq pages
    Valentina Lanzuise mainly works on Locations, Location1, ServiceByLocation and ServicesByLocation1 pages
    Simone Lazzaretti mainly works on People, Person1, PeopleByAlphabeticOrder and PeopleByRole pages

Description of the REST API

    /people?undefined (if either no query parameter is present or is different from the two listed below, returns of all people working in the association sorted by id)
    /people?sorting=name (sorting = sorting strategy for people working in the association [name=sorted by name in an ascended manner])
    /people?sorting=role (sorting = sorting strategy for people working in the association [role=sorted by role in an ascended manner])
    /person?id=201 (id = identifier of people working in the association [valid id: 201 202 203 204 205])
    /location?undefined ( it returns all the locations of our association, and it is independent from query parameters)
    /location1?id=101 (id = identifier of location of the association, [valid id: 101 102 103 104 105])
    /serviceByLocation ( it returns all the locations in which services of our association are placed, and it is independent from query parameters)
    /servByLoc1?id=101 ( it returns the location with that id in which services of our association are placed, [valid id: 101 102 103 104 105])
    /services (it returns all the services of our association, and it is independent from query parameters)
    /serv1?id=601 ( id= identifier of the service of our association, [valid id: 601 602 603 604 605])
    /contacts (it returns the list of contacts needed by our association)
    /faq (it returns the list of faqs )
