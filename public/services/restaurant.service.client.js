
(function (){
    angular
        .module("ProjectMaker")
        .factory("restaurantService",restaurantService);

    function restaurantService ($http) {


        var api = {
            "createRestaurant": createRestaurant,
            "findRestaurantByOwner":findRestaurantByOwner,
            "findRestaurantById":findRestaurantById,
            "updateRestaurant":updateRestaurant,
            "deleteRestaurant":deleteRestaurant,
            "createAPIResturantIfNotExist":createAPIResturantIfNotExist,
            "findAllPartnerResturantsInThisLocation":findAllPartnerResturantsInThisLocation,
            "findRestaurant":findRestaurant,
            "deleteOrderFromConsole":deleteOrderFromConsole,
            "searchMenu":searchMenu,
            "searchRestaurant":searchRestaurant

        };


        return api;






        function searchRestaurant(restName,restAdd) {



            if (restName && restAdd){
                var formattedRestName=restName.split(' ').join('+');
                formattedRestName=restName.replace(/\#/g,'%23');
                formattedRestName=formattedRestName.replace(/[\/]/g,'^');

                var formattedRestAdd=restAdd.split(' ').join('+');
                formattedRestAdd=formattedRestAdd.replace(/[\/]/g,'^');
                formattedRestAdd=formattedRestAdd.replace(/\#/g,'%23');

                return $http.get('/api/getAPIRestaurantFromName/'+formattedRestName+'/AndProvidedAddress/'+formattedRestAdd);
            }
            else{

                var formattedRestAdd=restAdd.split(' ').join('+');
                formattedRestAdd=formattedRestAdd.replace(/[\/]/g,'^');
                formattedRestAdd=formattedRestAdd.replace(/\#/g,'%23');

                    return $http.get('/api/getAPIRestaurantFromProvidedAddress/'+ formattedRestAdd);
            }


        }




        function searchMenu(restaurantId) {

            return $http.get('/api/getAPIRestaurantMenu/'+restaurantId);

        }

        function deleteRestaurant(restaurantId) {
            return $http.delete('/api/restaurant/'+restaurantId);

        }

        function updateRestaurant(restaurantId,restaurant) {
            return $http.put('/api/restaurant/'+restaurantId,restaurant);
        }

        function createRestaurant (userId,restaurant) {
            return $http.post('/api/user/'+userId+'/restaurant/',restaurant);
        }

        function findRestaurantByOwner(userId) {
            return $http.get('/api/user/'+userId+'/restaurant');
        }

        function findRestaurantById(restaurantId) {
            return $http.get('/api/restaurant/'+restaurantId);

        }

        function createAPIResturantIfNotExist (restaurant) {
         return   $http.post('/api/apiresturant/create',restaurant);
        }

        function findAllPartnerResturantsInThisLocation(search) {
            if(search.name){
                search.name=search.name.replace(/\#/g,'%23');
                search.name=search.name.replace(/\s+/g,'+');
                search.name=search.name.replace(/[\/]/g,'^');

            }

            if(search.address){
                search.address=search.address.replace(/\#/g,'%23');
                search.address=search.address.replace(/[\/]/g,'^');
                search.address=search.address.replace(/\s+/g,'+');
            }

          return $http.get('/api/partnerRestaurant?name='+search.name+'&address='+search.address);
        }

        function findRestaurant() {
            return $http.get('/api/restaurants');
        }
        function deleteOrderFromConsole(restaurantId, OrderId) {
            return $http.put("/api/restaurants/"+restaurantId+"/order/"+OrderId);
        }
    }
})();