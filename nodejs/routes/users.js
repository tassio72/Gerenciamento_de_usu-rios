let NeDB = require("nedb");
let db = new NeDB ({
    filename: "users.db",
    autoload: true
})


module.exports = app => {
    
    app.get("/users", (req, res) => { 

        db.find({}).sort({name:1}).exec((err, users) => {

            if (err) {
                console.log(`error: ${err}`);
                res.status(400).json({
                    error:err
                })
            } else {

                res.statusCode=200; //se o status da requisição foi bem sucedida
                res.setHeader("content-type", "application/json"); //respondendo em JSON
                res.json({ //equivale a um end(JSON.stringify)
                    users:users
                });
                
            }

        })
    
        
    });
    
    
    
    app.post("/users", (req, res) => { 
    
       
        db.insert(req.body, (err, user) => {

            if (err) {
                console.log(`error: ${err}`);
                res.status(400).json({
                    error: err
                })
            } else {

                res.status(200).json(user);
            }

        });
    });
    
};