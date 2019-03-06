class UserController {
  
    constructor(formId, tableId) {//como parametro recebemos os Id de form e tbody

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    }

    onSubmit(){

        this.formEl.addEventListener("submit", event =>{ //evento ao submeter

            event.preventDefault();
            
            let btn = this.formEl.querySelector("[type=submit]"); //pegando o botão de salvar
            
            btn.disabled = true;

            var valuesUser = this.getValues();
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
                resolve("dist/img/boxed-bg.jpg"); //imagem padrão para quem não colocar imagem
            } 
            
            //para caso o user não carregar uma foto
        });
    }

    getValues () {

        let user = {};
        /* o JSON é preenchido da seguinte forma JSON_Name = {nomeDoAtributo: "valor", n}
        Se quisermos acessar o valor de um atributo dentro do JSON:
        JSON_Name["nomeDoAtributo"];
        O mesmo serve para atribuir um novo atributo para o JSON, conforme veremos
        */

        let isValid = true; //para auxiliar na validação do formulário

        //elemets do formId são todos os elementos HTML. Como São elemetos do HTML, e estes não tem forEach, vamos usar o spread operator
        [...this.formEl.elements].forEach((field, index) => {
    
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

        //dataset coloca informações direto no HTML em string pura, que mais tarde podem ser recuperadas. Aqui, vamos colocar os dados recebidos do Objeto dentro da variavel dataset, no caso "user"
        tr.dataset.user = JSON.stringify(dataUser); //por salvar como string pura, vamos usar o JSON para preservar as propriedades do Objeto, MAS COM ISSO PERDEMO A ISTANCIA DO OBJETO
        //fonte.dataset.variavelQueReceberáDados
        tr.innerHTML = 
                        `
                            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                            <td>${dataUser.name}</td>
                            <td>${dataUser.email}</td>
                            <td>${(dataUser.admin) ? "Admin" : "" }</td>
                            <td>${Helpers.dateFormat(dataUser.register)}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                            </td>
                        `;
        this.tableEl.appendChild(tr);

        this.updateCount(); //atualiza quantos usuários cadastrados e quando admins
         
    }; //addLine close

    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr=>{ //o atributo children pega os filhos do elemento, no caso as trs do tbody(que chamamos de tableEl)

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++; //esse _admin que chamamos é do JSON
            console.log(user);
        });


        document.querySelector("#number-users").innerHTML = numberUsers; //atualizando na view
        document.querySelector("#number-users-admin").innerHTML = numberAdmin; //atualizando na view


    }


}