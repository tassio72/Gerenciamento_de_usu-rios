let express = require ("express");
let routes = express.Router();

routes.get("/", (req, res) => { 

    res.statusCode=200; //se o status da requisição foi bem sucedida
    res.setHeader("content-type", "application/json"); //respondendo em JSON
    res.json({ //equivale a um end(JSON.stringify)
        users:[]
    });
});



routes.get("/admin", (req, res) => { 

    res.statusCode=200; //se o status da requisição foi bem sucedida
    res.setHeader("content-type", "application/json"); //respondendo em JSON
    res.json({ //equivale a um end(JSON.stringify)
        users:[{
            name:"Tássio",
            email:"tassio@hotmail.com",
            id:1
        }]
    });
});

module.exports = routes;