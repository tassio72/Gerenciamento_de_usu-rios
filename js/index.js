/* PARA FINS DIDÁTICOS
let gender = document.querySelectorAll("#form-user-create [name = gender]:checked");
//por se tratar de um input tipo radio, queremmos pega apenas o que foi checked pelo user. Então colocamos alguns filtros no querySelectorAll
// no caso, dizemod primeiro pra ele selecionar tudo que tiver name=gender dentro do form-user-create.
//no caso, temos as opções masculino e feminino, mas queremos o que o user checked, então colocamos checked como parametro. 
*/

var fields = document.querySelectorAll("#form-user-create [name]");

//vamos criar nosso JSON, observe que ele começa vazio.
var user = {};
/* o JSON é preenchido da seguinte forma JSON_Name = {nomeDoAtributo: "valor", n}
Se quisermos acessar o valor de um atributo dentro do JSON:
JSON_Name["nomeDoAtributo"];
O mesmo serve para atribuir um novo atributo para o JSON, conforme veremos
*/



document.querySelector("#form-user-create").addEventListener("submit", (event) =>{

    event.preventDefault();

    fields.forEach((field, index) => {
    
        if (field.name == "gender") {//para a perguntado tipo radio, pegaremos apenas o que for selecionado
        
            if (field.checked) {
        
                user[field.name] = field.value;
                //pegando o valor marcado como checked pelo user e colocando no JSON. 
                //Observe que para criar um novo atributo e atribuirmo um valor, seguimos o padrão JSON["NewAtributeName"] = value;
        
            }
        
        } else {
        
                user[field.name] = field.value;
                //pegando valores preenchidos pelo user e colocando no JSON
                //Observe que para criar um novo atributo e atribuirmo um valor, seguimos o padrão JSON["NewAtributeName"] = value;
        };
        
    });


});

