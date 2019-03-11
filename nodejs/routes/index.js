module.exports = app => {
    
    app.get("/", (req, res) => { 
    
        console.log(req.url);
        console.log(req.method);
    
            res.statusCode=200; //se o status da requisição foi bem sucedida
            res.setHeader("content-type", "text/html"); //respondendo em formato HTML
            res.end(
                `<!DOCTYPE html>
                <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <title>Document</title>
                    </head>
                    <body>
                        <h1>
                            Olá
                        </h1>
                    
                    </body>
                </html>`
            );
    
    });


};