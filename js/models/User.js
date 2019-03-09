class User {

    //As informações do JSON vem para cá
    constructor(name, gender, birth, country, email, password, photo, admin) {
            
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

}