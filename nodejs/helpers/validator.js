module.exports = {
    
    user:(app, req, res) => {
        
        req.assert("name", "Nome é obrigatório").notEmpty();    
        req.assert("email", "email inválido").notEmpty().isEmail();
        
        let errors = req.validationErrors();
        
        if (errors) {
        
            app.helpers.error.send(errors, req, res);
            return false;
        } else {
            return true;
        }
    }
        

}
