
module.exports=function(app) {
    app.get('/api/getAuth', getAuth);




    var streetConfig = {
        authId    : process.env.STREET_AUTH_ID,//"52f5833b-1da4-faba-c50e-867fcf8483ab",
        authToken : process.env.STREET_AUTH_TOKEN //"OBIODzh3R8wnGKwblEFB"

    };

    function getAuth(req,res) {

        res.json(streetConfig);
    }

};