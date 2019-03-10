class User {

    //As informações do JSON vem para cá
    constructor(name, gender, birth, country, email, password, photo, admin) {
        
            this._id;

            this._register = new Date(); //data do registro

            this._name = name;
            this._gender = gender;
            this._birth = birth;
            this._country = country;
            this._email = email;
            this._password = password;
            this._photo = photo;
            this._admin = admin;
            
    }


 //Getters-----------------------------------

    get id(){
        return this._id;
    }
 
    get register() {
        return this._register;
    }

    get name () {
        return this._name;
    }

    get gender () {
        return this._gender;
    }

    get birth () {
        return this._birth;
    }

    get country () {
        return this._country;
    }

    get email () {
        return this._email;
    }

    get password () {
        return this._password;
    }

    get photo () {
        return this._photo;
    }

    get admin () {
        return this._admin;
    }

//Setters-----------------------------------

    set photo (value) {
        this._photo = value;
    }

//Outros---------------------

    loadFromJSON (json) {

        for (name in json) { //fazendo um for in no JSON, percorrendo cada objeto do JSON

            switch(name) {

                case "_register": //no caso da data, quando formos usar esse dados, precisamos instancia-lo, pois estará apenas como uma string
                    this[name] = new Date (json[name]);
                break;

                default:
                this[name] =  json[name];

            }
            

        }
    }

//Storage-------------------

    static getUsersStorage() { //obtendo os dados da Storage

            
        /*Vamos inserir os dados dentro da sessionStorage 

        vamos usar o método da sessionStorage: setItem("NomeDaChave", "ValorDaChave");
        chave intenda como referência/index/nome que serve para acessarmos o value. Lembrando que este método retorna uma STRING
        
        
        como recebemos os dados em formato JSON, se tentarmos colocar o JSON.Stringfy direto, como segundo parametro. 
        O storage vais receber uma string normal e vamos perder as informações do Object. Por isso precisamos passas os dados para uma Array, salva dados por dado e depois passar para o storage via JSON
        */

    let users = [];

    if (sessionStorage.getItem("users")) { //caso já tenha informações na minha storage, vamos preservar essas informações colocando-as primeiro no array
        //localStorage.getItem("users")
        users = JSON.parse(sessionStorage.getItem("users")); //vamos colocar no array, os valores storage, preservando o objeto via JSON...lembrando que sessionStorage.getItem retorna uma string
                            //localStorage.getItem("users")           //parse = interpretação
    }

    return users;
    }

    getNewId(){ //método para criar ID. Esse método poderá ser acessado em vários lugares, então vamos deixar em um escopo global

        let usersId = parseInt(localStorage.getItem("usersID"));
        //vamos deixar salvo o id na Storage

        if (!usersId > 0) usersId = 0; //primeiro vamos validar se existe

        usersId++;

        localStorage.setItem("usersID", usersId);

        return usersId;
    }

    save(){
        /*Vamos inserir os dados dentro da sessionStorage 

        vamos usar o método da sessionStorage: setItem("NomeDaChave", "ValorDaChave");
        chave intenda como referência/index/nome que serve para acessarmos o value. Lembrando que este método retorna uma STRING
        
        
        como recebemos os dados em formato JSON, se tentarmos colocar o JSON.Stringfy direto, como segundo parametro. 
        O storage vais receber uma string normal e vamos perder as informações do Object. Por isso precisamos passas os dados para uma Array, salva dados por dado e depois passar para o storage via JSON
        */

        let users = User.getUsersStorage(); //pegando todos os usuários do storage

        /*Precisamos criar um ID para cada tr pois caso tenhamos dados parecido na Storage, não teremos como pegar essas informações */
        if (this.id > 0) {//fazendo o filtro para saber se a tr já tem um ID(pois pode ser uma edição ou uma nova tr)
            
            users.map( u=> { //vamos fazer um map para identificar o usuário cadastrado e já substituir pelas novas informações
                
                if (u._id == this.id) { //vamos achar esse this.id no Storage  
                     
                    Object.assign(u, this);// o this está com os dados atualizados
                    /*vamos usar o método assign para substituir o valores atuais do storage (que estão em this)
                    dentro do user (u) que identificamos com o mesmo id
                    */   

                
                };

                return u;    

            })
            
        } else {

            this._id = this.getNewId();

            users.push(this); //colocando o JSON no array, adicionando os dados que ainda não estão
            
        }
        
            sessionStorage.setItem("users", JSON.stringify(users));
            //localStorage.setItem("users", JSON.stringify(users)); //para colocar no localStorage


    }

    remove(){

        let users = User.getUsersStorage(); //pegando todos os usuários do storage

        users.forEach((userData, index) => {
            
            if (this._id == userData._id) { //vamos encontrar o id que chamou o metodo remove para tira-lo do storage
            
                users.splice(index, 1);
                //método splice remove um elemento do array. array.splice(posiçãoExcluir, QuantidadeExclusõesApartirDo"posiçãoExcluir")
            }
            
        });

        sessionStorage.setItem("users", JSON.stringify(users));
            //localStorage.setItem("users", JSON.stringify(users)); //para colocar no localStorage

    }

}