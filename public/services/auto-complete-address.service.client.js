
(function () {
    angular
        .module("ProjectMaker")
        .factory("addressAPISearchService", addressAPISearchService);

    function addressAPISearchService($http) {

        var api = {

            "autoCompleteAddress":autoCompleteAddress,

        };

        return api;



        function autoCompleteAddress (addressToLookUp) {
            var clientSidePublicKey='23798189804171195';
            return $http.get('https://us-autocomplete.api.smartystreets.com/suggest?auth-id='+clientSidePublicKey+'&prefix='+addressToLookUp);

        }
    }

})();

