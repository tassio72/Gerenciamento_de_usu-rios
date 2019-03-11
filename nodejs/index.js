//const http = require ("http"); //o require incorpora algo ao código.Vamos incorporar a biblioteca http

//importante: o comando crtl + c interrompe o servidor. Isso é importante porque qulquer alteração no code, para ser subida ao servidor, antes este deve ser interronpido.

const express = require("express"); //o express já trás o http internamente
const consign = require("consign");//fazendo inclusão do consign
const bodyparser = require("body-parser");//fazendo inclusão bady-parser para que o express entenda o post
const expressValidator = require("express-validator");

let app = express();

app.use(bodyparser.urlencoded ({ extended: false}));
app.use(bodyparser.json()); //para ficar mais facil de trabalhar, camos converter os dados em json
app.use(expressValidator());

consign().include("routes").include("helpers").into(app); //usando o consig para incluir as rotas na variável app. Repare que ele pega a pasta routes com tud que tem dentro

/*
Precisamos informar ao servidor qual a porta que ele ficará escutando os request
Para aí executar as respondes
como atribuimos a criação do servidor a variável server, vamos usa-la para qe fique escutando a porta 3000
*/
app.listen(3000, "127.0.0.1", () => { //no método listen, também passamos o número do IP que será criado.
        console.log("servidor rodando");
});



/* COMO FICARIA SEM USAR O EXPRESS
Vamos pegar o método createServer para criar o servidor.
Vamos passar uma => como parametro, que vai ter outros dois parametros: request (req) e response(res)


let server = http.createServer((req, res) => { 

    console.log(req.url);
    console.log(req.method);

    switch (req.url) {
        case "/": //localHost:3000

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
        break;

        case "/users": //localHost:3000/users 
        res.statusCode=200; //se o status da requisição foi bem sucedida
        res.setHeader("content-type", "application/json"); //respondendo em JSON
        res.end(JSON.stringify({
            users:[{
                name:"Tássio",
                email:"tassio@hotmail.com",
                id:1
            }]
        }))
        break;

    }

});

*/