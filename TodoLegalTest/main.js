'use strict'
var serverGraphql = require('./server').server;
var server = new serverGraphql('localhost', 4000);


//const fetch = require("node-fetch");
//
//fetch('http://localhost:4000/graphql', {
//    method: 'POST',
//    headers: {
//        'Content-Type': 'application/json',
//        'Accept': 'application/json',
//    },
//    body: JSON.stringify({query getSingleCourse($courseID: Int!) {
//course(id: $courseID) {
//       title
//        author
//        description
//        topic
//        url
//    }
//}: "{ hello }"})
//})
//        .then(r => r.json())
//        .then(data => console.log('data returned:', data));
    // Application Routes
    server.app.use('/assets',server.express.static(`web/assets`));
    server.app.use(server.express.json());
    server.app.use(server.express.urlencoded());
    
    let checkAuth = (req,res,next)=> {
        // Here you can define custom rules / security checks (Middleware checks)
        next();
    }

server.app.get('/', (req, res) => {
    return res.redirect('/index');
});
server.app.get('/index', (req, res) => {
    res.sendFile(`${__dirname}/web/index.html`);
});

  