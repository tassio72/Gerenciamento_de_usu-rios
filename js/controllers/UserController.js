class UserController {
  
    constructor(formIdCreate, formIdUpdate, tableId) {//como parametro recebemos os Id de form e tbody

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

        this.onEdit();

        this.showPanelCreate ();
    }

    onEdit() {

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{
            this.showPanelCreate();

        })

        this.formUpdateEl.addEventListener("submit", event => {

            event.preventDefault();

            let btn = this.formUpdateEl.querySelector("[type=submit]"); //pegando o botão de atualizar
            
            btn.disabled = true; //bloqueando o botão pro usuário não ficar clicando várias vezes 

            let valuesUser = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex; //pegadon o valor inserido na linha via sectionRowIndex, em addLine

            let tr = this.tableEl.rows[index]; //a propriedade rows da table acessa a linha da tabela com o [index] informado

            //lembre que as informações do user já estão dentro de uma variável do tipo dataset, dentro da tr. ENtão vamos precisar sobrescrever essas informações na tr, de acordo com a edição do usuário.
            tr.dataset.user = JSON.stringify(valuesUser) ;
                        
            tr.innerHTML = 
            `
                <td><img src="${valuesUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${valuesUser.name}</td>
                <td>${valuesUser.email}</td>
                <td>${(valuesUser.admin) ? "Admin" : "" }</td>
                <td>${Helpers.dateFormat(valuesUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            `;

            this.addEventsTr(tr);

            this.updateCount();

            btn.disabled = false; //reativando botão de atualizar 

        });

    };//caso o user cancele o updateForm. Esse método já será invocado no construtor, para deixa-lo preparadp



    onSubmit(){

        this.formEl.addEventListener("submit", event =>{ //evento ao submeter

            event.preventDefault();
            
            let btn = this.formEl.querySelector("[type=submit]"); //pegando o botão de salvar
            
            btn.disabled = true;

            let valuesUser = this.getValues(this.formEl);

            if (!valuesUser) {
                btn.disabled = false;
                return false
            } 

            this.getPhoto().then(content =>{
   
                valuesUser.photo = content;
                //como addLine coloca HTML elemets, só podemos executa-la depois de carregar a foto, pois esta ta no meio da tamplate string
                this.addLine(valuesUser); // pegando os dados do valuesUser - pelo metodos getValues - e chamando o addLine

                this.formEl.reset(); //limpando todos os campos do formulário
                this.formEl.elements[0].focus(); //dando focu ao nome
               
                btn.disabled = false;

            }), erro => {
                console.error(erro);
                alert("Erro no processamento da imagem, tente novamente");
            };
            
        })
    
    } //onSubmit close

    getPhoto () { 

        return new Promise ((resolve, reject) => {
            //FileReader é um API nativa do JS de leitura de arquivo
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => { 
                
                if (item.name === "photo") {
                    return item;
                };
            
            })//o filter vai pegar o array formado pelo spread e fazer um novo array com o critério passado na função

            let file = elements[0].files[0];//pegando o arquivo dentro do novo array, no caso a foto
            
            fileReader.onload = () => {
                //importante lembrar que temos o tempo de carregamento do arquivo. Isso impacta nos métodos da class
            
                resolve(fileReader.result); //vamos criar uma versão do arquivo em base64

            }; //onload faz o carregamento do arquivo

            fileReader.onerror = erro => {

                reject(erro);
            }

            if (file){
                fileReader.readAsDataURL(file);
            }else{
                resolve("dist/img/avatar04.png"); //imagem padrão para quem não colocar imagem
            } 
            
            //para caso o user não carregar uma foto
        });
    }

    getValues (formEl) {

        let user = {};
        /* o JSON é preenchido da seguinte forma JSON_Name = {nomeDoAtributo: "valor", n}
        Se quisermos acessar o valor de um atributo dentro do JSON:
        JSON_Name["nomeDoAtributo"];
        O mesmo serve para atribuir um novo atributo para o JSON, conforme veremos
        */

        let isValid = true; //para auxiliar na validação do formulário

        //elemets do formId são todos os elementos HTML. Como São elemetos do HTML, e estes não tem forEach, vamos usar o spread operator
        [...formEl.elements].forEach((field, index) => {
    
            if (["name", "email", "password"].indexOf(field.name) > -1 && !field.value) { //validando os campos obrigatório
                field.parentElement.classList.add("has-error"); //adicionando oo pai do elemento field, via parentElement, a class has-error
                isValid = false;
            }

            if (field.name == "gender") {//para a perguntado tipo radio, pegaremos apenas o que for selecionado (checked) pelo usuário
            
                if (field.checked) { //checked é uma propriedade
            
                    user[field.name] = field.value;
                    //pegando o valor marcado como checked pelo user e colocando no JSON. 
                    //Observe que para criar um novo atributo e atribuirmo um valor, seguimos o padrão JSON["NewAtributeName"] = value;
                    
                }
            
            } else if (field.name == "admin") {

                user[field.name] = field.checked;
                //verificando se o admin foi checked para atualizar na view
                                              
            } else {
            
                    user[field.name] = field.value;
                    //pegando valores preenchidos pelo user e colocando no JSON
                    //Observe que para criar um novo atributo e atribuirmo um valor, seguimos o padrão JSON["NewAtributeName"] = value;
            };
            
        });
    
        if (!isValid) {
            return false;
        }
        return new User (user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin)    
        

    }//getValues close




    addLine (dataUser) {

        let tr = document.createElement("tr");

        //dataset coloca informações direto no HTML em string pura, que mais tarde podem ser recuperadas. Aqui, vamos colocar os dados recebidos do Objeto dentro da variavel dataset, no caso "user". Depois de rodar, inspecione no navegador, tbody formada e veja que os dados do objeto estão lá
        tr.dataset.user = JSON.stringify(dataUser); //por salvar como string pura, vamos usar o JSON para preservar as propriedades do Objeto, MAS COM ISSO PERDEMO A ISTANCIA DO OBJETO
        //fonte.dataset.variavelQueReceberáDados, logo na linha a cima criamos uma variável (user) que terá uma identificação no HTML como "data-user"
        tr.innerHTML = 
                        `
                            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                            <td>${dataUser.name}</td>
                            <td>${dataUser.email}</td>
                            <td>${(dataUser.admin) ? "Admin" : "" }</td>
                            <td>${Helpers.dateFormat(dataUser.register)}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                            </td>
                        `;

        
        this.addEventsTr(tr);

        this.tableEl.appendChild(tr);

        this.updateCount(); //atualiza quantos usuários cadastrados e quando admins
         
    }; //addLine close

    addEventsTr(tr) {

        
        tr.querySelector(".btn-edit").addEventListener("click", editar => { //para que o user consigar editar, adicionamos a class btn-edit no botão de cada linha
           
            let json = JSON.parse(tr.dataset.user); //vamos guardar as informações preenchidas pelo user dentro da própria tr, usando a variável user como referencia
            let form =document.querySelector("#form-user-update");

            /*Por se tratar de uma edição dde dados já cadastrados, 
            precisamos criar uma referencia que mais tarde será usada para substituir os valores da linha certa da tabela.
            Vamos colocar este valor usando o dataset.
            a propriedade sectionRowIndex retorna o valor da linha da tabela, começando de zero. Então linha 1 = 0, linha 2 = 1...
             */
            form.dataset.trIndex = tr.sectionRowIndex; //vamos salvar o número da linha dentro da variável trIndex (do tipo dataset)

            
            for (let nomeCampo in json) { //vamos fazer um for in, para percorrer cada elemento dentro do objeto json e salvar dentro da variável nameCampo (a variável muda de valor a cada laço, ou seja nameCampo não é um array)
                console.log(nomeCampo);
                /*agora vamos usar o valor do momento da variável nomeCampo como referencia para pesquisar dentro do form,
                 qual elemento HTML possui o [name = nomeCampo].
                 Lembranado que como nomeCampo vem do JSON, o atributo do JSON vai retornar com o anderline (_name, _gender...),
                 por isso precisamos fazer o raplace, pois no [name] do HTML, deste form, está sem o anderline.
                 */
                let field = form.querySelector("[name=" + nomeCampo.replace("_", "") + "]"); //fazendo a pesquisa e trocando "_" por ""
            
                if (field) { //vamos lembrar que dentro do json, temos o atributo register, mas não há nenhum campo no form com este nome, então precisamos validar se o nomeCampo existe no form
                    
                    switch (field.type) {
                        case "file": //como temos o campo da foto, vamos dá um continue para o type == file, para ele ir pro próximo nomeCampo pois a foto não retorna um value.
                        continue;
                        
                        case "radio":
                        field = form.querySelector("[name=" + nomeCampo.replace("_", "") + "][value=" + json[nomeCampo] + "]"); //como as duas opções do radio tem o mesmo nomeCampo (gender), precisamos colocar outro filtro para o seletor saber quem foi selecionado, no caso usamos o [value]
                        field.checked = true;
                        break;

                        case "checkbox": //para o admin, que pode ser cheked or not checked
                            field.checked = json[nomeCampo];
                        
                            break;

                        default:
                        field.value = json[nomeCampo]; //o json devolve o valor deontro da posição [nomeCampo], é como se fosse um index, usando o próprio nome do elemento                   

                    }  

                }    
            }
            
            
            
            this.showPanelUpdate();
           
        });

    };



    showPanelCreate (){

        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";


    }//para mostrar o createForm e esconder o UpdateForm

    showPanelUpdate (){

        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";

    }//para mostrar o updateForm e esconder o createForm


    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr=>{ //o atributo children pega os filhos do elemento, no caso as trs do tbody(que chamamos de tableEl)

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++; //esse _admin que chamamos é do JSON
            
        });


        document.querySelector("#number-users").innerHTML = numberUsers; //atualizando na view
        document.querySelector("#number-users-admin").innerHTML = numberAdmin; //atualizando na view


    }


}