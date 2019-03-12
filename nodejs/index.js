//importante: o comando crtl + c interrompe o servidor. Isso é importante porque qulquer alteração no code, para ser subida ao servidor, antes este deve ser interronpido.

const express = require("express"); //o express já trás o http internamente
const consign = require("consign");//fazendo inclusão do consign
const bodyparser = require("body-parser");//fazendo inclusão bady-parser para que o express entenda o post
const expressValidator = require("express-validator");

let app = express(); //acionando a função que é retornada no require do express

app.use(bodyparser.urlencoded ({ extended: false}));
app.use(bodyparser.json()); //para ficar mais facil de trabalhar, vamos converter os dados em json
app.use(expressValidator());

consign().include("routes").include("helpers").into(app); //usando o consig para incluir as rotas na variável app. Repare que ele pega as pastas routes com tud que tem dentro

/*
Precisamos informar ao servidor qual a porta que ele ficará escutando os request
Para aí executar as respondes
como atribuimos a criação do servidor a variável server, vamos usa-la para qe fique escutando a porta 3000
*/
app.listen(3000, "127.0.0.1", () => { //no método listen, também passamos o número do IP que será criado.
        console.log("servidor rodando");
});
