class UserController {
  
    constructor(formId, tableId) {//como parametro recebemos os Id de form e tbody

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    }

    onSubmit(){

        this.formEl.addEventListener("submit", event =>{ //evento ao submeter

            event.preventDefault();

            var valuesUser = this.getValues();

            
            this.getPhoto(content =>{
                
                valuesUser.photo = content;
                //como addLine coloca HTML elemets, só podemos executa-la depois de carregar a foto, pois esta ta no meio da tamplate string
                this.addLine(valuesUser); // pegando os dados do valuesUser - pelo metodos getValues - e chamando o addLine
            
            }); //get photo passa uma função como parametro, que tráz o conteúdo da imagem como return e passando para content

            
        })
    
    } //onSubmit close

    getPhoto (callback) { //get photo recebe uma função callback como parametro

        //FileReader é um API nativa do JS de leitura de arquivo
        let fileReader = new FileReader();

        let elements = [...this.formEl.elements].filter(item => { 
            
            if (item.name === "photo") {
                return item;
            };
        
        })//o filter vai pegar o array formado pelo spread e fazer um novo array com o critério passado na função

        let file = elements[0].files[0];//pegando o arquivo dentro do novo array, no caso a foto
        
        //vamos usar um callback: uma função que é chamada depois que outra é finalizada
        fileReader.onload = () => {
            //importante lembrar que temos o tempo de carregamento do arquivo. Isso impacta nos métodos da class
          
            callback(fileReader.result); //vamos criar uma versão do arquivo em base64

        }; //onload faz o carregamento do arquivo

        fileReader.readAsDataURL(file);

    }

    getValues () {

        let user = {};
        /* o JSON é preenchido da seguinte forma JSON_Name = {nomeDoAtributo: "valor", n}
        Se quisermos acessar o valor de um atributo dentro do JSON:
        JSON_Name["nomeDoAtributo"];
        O mesmo serve para atribuir um novo atributo para o JSON, conforme veremos
        */

        //elemets do formId são todos os elementos HTML. Como São elemetos do HTML, e estes não tem forEach, vamos usar o spread operator
        [...this.formEl.elements].forEach((field, index) => {
    
            if (field.name == "gender") {//para a perguntado tipo radio, pegaremos apenas o que for selecionado (checked) pelo usuário
            
                if (field.checked) { //checked é uma propriedade
            
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
    
        return new User (user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin)    
        

    }//getValues close




    addLine (dataUser) {

        this.tableEl.innerHTML = 
                        `<tr>
                            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                            <td>${dataUser.name}</td>
                            <td>${dataUser.email}</td>
                            <td>${dataUser.admin}</td>
                            <td>${dataUser.birth}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                            </td>
                        </tr>`
    
         
    }; //addLine close


}