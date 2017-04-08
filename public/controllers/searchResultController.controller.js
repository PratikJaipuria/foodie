(function(){
    angular
        .module("ProjectMaker")
        .controller("searchResultController", searchResultController);
    function searchResultController(userService, menuService, SearchService,restaurantService,addressAPISearchService, $location, $routeParams, $timeout, $filter){


        var vm = this;
        var address=$routeParams['add'];
        var name= $routeParams['rn'];
        // var userId=$routeParams['uid'];
        var allResturants=[];
        var apiResturants=[];
        var backupRetrievedResturants=[];
        vm.restaurants=[];
        vm.restaurantFound=false;

        // vm.userId = userId;

        vm.search={
            name: name,
            address: address
        };


        //searchRestaurant takes care of modified query
        vm.searchRestaurant=searchRestaurant;
        vm.sortAtoZ=sortAtoZ;
        vm.viewMenu=viewMenu;
        vm.searchOpenRestaurant=searchOpenRestaurant;
        vm.navigateToProfile=navigateToProfile;
        vm.searchRestaurantsOfferingPickup=searchRestaurantsOfferingPickup;
        vm.searchRestaurantsOfferingDelivery=searchRestaurantsOfferingDelivery;
        vm.fetchPartnerResturants=fetchPartnerResturants;
        vm.loadAddressFromAPI=loadAddressFromAPI;
        vm.autocompleteSearchRestaurants=autocompleteSearchRestaurants;
        vm.displaySearchedRestaurantFromAutoCompleteList=displaySearchedRestaurantFromAutoCompleteList;

        function init() {

            var promise=userService.findCurrentUser();
            promise.success(function (user) {
                vm.user=user;
                vm.userId = user._id;
                userId = user._id;
            }).error(function (err) {

            });


            fetchPartnerResturants(vm.search);
            searchAPIRestaurants(vm.search);





            $(document).ready(function () {
                setTimeout(function () {
                    $('#mainCOntainer').show(500);
                }, 2000);
            })






        }
        init();

        function loadAddressFromAPI(addressTextSoFar) {

            var formattedSpace=vm.search.address.replace(/\s+/g,'+');
            var formatedSpaceAndPound=formattedSpace.replace(/#/g, '%23');

            var promise=addressAPISearchService.autoCompleteAddress(formatedSpaceAndPound);
            promise.success(function (addr) {
                vm.addressFromAPI=addr.suggestions;

            }).error(function (err) {
                vm.error=err;
            })

        }




        function searchRestaurant(searchRestaurants){

            if(searchRestaurants.address){
                var refToNewResturant=[];
                var tokensWithoutNamereference=$location.url().split('/name/');
                if(tokensWithoutNamereference.length>1){
                    if (searchRestaurants.name){
                        refToNewResturant=tokensWithoutNamereference[0]+'/name/'+searchRestaurants.name+'/address/'+searchRestaurants.address;
                    }
                    else{
                        refToNewResturant=tokensWithoutNamereference[0]+'/address/'+searchRestaurants.address;
                    }
                }

                else{
                    var tokensWithoutAddressreference= $location.url().split('/address/');
                    if (searchRestaurants.name){
                        refToNewResturant=tokensWithoutAddressreference[0]+'/name/'+searchRestaurants.name+'/address/'+searchRestaurants.address;
                    }
                    else{
                        refToNewResturant=tokensWithoutAddressreference[0]+'/address/'+searchRestaurants.address;
                    }
                }

                $location.url(refToNewResturant);
            }

            else{
                throwError("Location field cannot be blank");
            }



        }




        function fetchPartnerResturants(search) {

            var promise=restaurantService.findAllPartnerResturantsInThisLocation(search);
            promise.success(function (partnerResturantsList) {

                allResturants=partnerResturantsList;



            }).error(function (err) {

            })


        }


        function searchAPIRestaurants(search) {
            if (search.address){

                var promise = SearchService.searchRestaurant(search.name, search.address);
                promise
                    .success(function (response) {

                        formatData(response.restaurants);

                    }).error(function (err) {

                    // $location.url("/");
                })
            }
            else{
                throwError('Please enter location.');
                // $location.url("/");
            }
        }




        function formatData(restaurants) {
            apiResturants = restaurants;
            for (var i=0; i < apiResturants.length ; i++){

                var res="";
                for(var j=0; j < apiResturants[i].foodTypes.length ; j++){
                    res = res + apiResturants[i].foodTypes[j] + " ";
                }
                apiResturants[i].cuisine = res;
            }

            for (var i in apiResturants){
                allResturants.push(apiResturants[i]);

            }
             vm.restaurants= allResturants;
            backupRetrievedResturants=allResturants;

            if (vm.restaurants.length == 0){
                vm.restaurantFound=false;
            }
            else{
                vm.restaurantFound=true;
            }




        }

        function viewMenu (apiKey, resturantObject) {
            var restaurantName=resturantObject.name.replace(/#/g,'-');

            var resturantDetails={
                _id:apiKey,
                name:restaurantName,
                logoUrl: resturantObject.logoUrl,
                streetAddress:resturantObject.streetAddress,
                city:resturantObject.city,
                state:resturantObject.state,
                country:resturantObject.country,
                offersDelivery: resturantObject.offersDelivery,
                offersPickup:resturantObject.offersPickup

            };



            if(resturantObject.partner){
                if(userId && name){
                    $location.url('/user/searchResult/name/'+name+'/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                }
                else if(userId){
                    $location.url('/user/searchResult/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                }
                else if(name && address){
                    $location.url('/searchResult/name/'+name+'/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                }

                else{
                    $location.url('/searchResult/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                }
            }
            else{

                var promise=restaurantService.createAPIResturantIfNotExist(resturantDetails);
                promise.success(function (resp) {



                    if(userId && name){
                        $location.url('/user/searchResult/name/'+name+'/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                    }
                    else if(userId){
                        $location.url('/user/searchResult/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                    }
                    else if(name && address){
                        $location.url('/searchResult/name/'+name+'/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                    }

                    else{
                        $location.url('/searchResult/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                    }

                }).error(function (err) {

                    throwError("We are unable to fetch Menu for this restaurant right now");
                })




            }




        }




        function navigateToProfile() {
            if (userId){
                $location.url("/user/profiel");
            }
            else{
                $location.url("/login");
            }
        }

        function throwError(errorMsg){
            vm.error=errorMsg;


            $timeout(clearError,5000);
        }

        function clearError() {
            vm.error='';
        }

        function sortAtoZ(way) {
            vm.restaurants=backupRetrievedResturants;
            vm.restaurants=$filter('orderBy')(vm.restaurants, 'name', way);

        }

        function searchOpenRestaurant(criteria) {
            vm.restaurants=backupRetrievedResturants;
            vm.restaurants=$filter('filter')(vm.restaurants, {open: criteria});
            restaurantsFoundInSearch();

        }

        function searchRestaurantsOfferingPickup(criteria) {
            vm.restaurants=backupRetrievedResturants;
            vm.restaurants=$filter('filter')(vm.restaurants, {offersPickup: criteria});
            restaurantsFoundInSearch();
        }

        function searchRestaurantsOfferingDelivery(criteria) {
            vm.restaurants=backupRetrievedResturants;
            vm.restaurants=$filter('filter')(vm.restaurants, {offersDelivery: criteria});
            restaurantsFoundInSearch();
        }

        function restaurantsFoundInSearch() {
            if (vm.restaurants.length == 0){
                vm.restaurantFound=false;
            }
            else{
                vm.restaurantFound=true;
            }
        }



        function autocompleteSearchRestaurants() {
            vm.restaurants=backupRetrievedResturants;
            var availableRestaurants = vm.restaurants.map(function(obj) {return obj.name;});
            $( "#restaurantsAutoComplete" ).autocomplete({
                source: availableRestaurants
            });
        }


        function displaySearchedRestaurantFromAutoCompleteList(restObj){
            vm.restaurants=backupRetrievedResturants;
            vm.restaurants=$filter('filter')(vm.restaurants, {name: restObj});
            restaurantsFoundInSearch();
        }


    }
})();



