
module.exports=function(app) {
    app.get('/api/getAuth', getAuth);
    // app.get('/api/getAuth',getAuthTokenforStreet);




    function getAuth(req,res) {
        var streetConfig = {
            authId    : "52f5833b-1da4-faba-c50e-867fcf8483ab",
            authToken : "OBIODzh3R8wnGKwblEFB"

        };
        res.json(streetConfig);
    }

};