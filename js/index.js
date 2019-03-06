/* PARA FINS DIDÁTICOS
let gender = document.querySelectorAll("#form-user-create [name = gender]:checked");
//por se tratar de um input tipo radio, queremmos pega apenas o que foi checked pelo user. Então colocamos alguns filtros no querySelectorAll
// no caso, dizemod primeiro pra ele selecionar tudo que tiver name=gender dentro do form-user-create.
//no caso, temos as opções masculino e feminino, mas queremos o que o user checked, então colocamos checked como parametro. 
*/

let userController = new UserController("form-user-create", "form-user-update", "table-user");


