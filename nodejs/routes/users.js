
module.exports = app => {
    
    app.get("/users", (req, res) => { 
    
        res.statusCode=200; //se o status da requisição foi bem sucedida
        res.setHeader("content-type", "application/json"); //respondendo em JSON
        res.json({ //equivale a um end(JSON.stringify)
            users:[]
        });
    });
    
    
    
    app.get("/users/admin", (req, res) => { 
    
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
    
};