let NeDB = require("nedb"); //requerindo o NeDB (banco de dados)
let db = new NeDB ({ 
    filename: "users.db",
    autoload: true
})


module.exports = app => {

    let route = app.route("/users");
    
    route.get((req, res) => { 

        db.find({}).sort({name:1}).exec((err, users) => {

            if (err) {

                    app.helpers.error.send(err, req, res);
                
            } else {

                res.statusCode=200; //se o status da requisição foi bem sucedida
                res.setHeader("content-type", "application/json"); //respondendo em JSON
                res.json({ //equivale a um end(JSON.stringify)
                    users:users
                });
                
            }

        })
    
        
    });
    
    
    
    route.post((req, res) => { 

       if (!app.helpers.validator.user(app, req, res)) return false;

        db.insert(req.body, (err, user) => {

            if (err) {

                app.helpers.error.send(err, req, res);
                
            } else {

                res.status(200).json(user);
            }

        });
    });

    let routeId = app.route("/users/:id");

    routeId.get((req, res) => {

        db.findOne({_id: req.params.id}).exec((err, user) => {
            
            if (err) {

                app.helpers.error.send(err, req, res);
                
            } else {

                res.status(200).json(user);
            }



        });
    })

    routeId.put((req, res) => {

        if (!app.helpers.validator.user(app, req, res)) return false;

        db.update({_id: req.params.id}, req.body, err => {
            
            if (err) {

                app.helpers.error.send(err, req, res);
                
            } else {

                res.status(200).json(Object.assign(req.params, req.body));
            }



        });
    })


    routeId.delete((req, res) => {

        db.remove({_id: req.params.id}, {}, err => {
            
            if (err) {

                app.helpers.error.send(err, req, res);
                
            } else {

                res.status(200).json(req.params);
            }



        });
    })
    
};