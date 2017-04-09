/**
 * Created by Pratik on 3/31/2017.
 */
(function () {
    angular
        .module("ProjectMaker")
        .controller("restaurantListController", restaurantListController);

    function restaurantListController($location,$routeParams, restaurantService,userService) {
        var vm = this;
        vm.gotoEdit =gotoEdit;

         var ownerId; //= $routeParams.uid;
        // vm.ownerId = ownerId;

        vm.logout = logout;
        // vm.editRestaurant = editRestaurant;


        function init() {
            var promise=userService.findCurrentUser();
            promise.success(function (user) {
                vm.user=user;
                vm.userId = user._id;
                ownerId = user._id;


                restaurantService
                .findRestaurantByOwner(ownerId)
                .success(function (restaurants) {
                    vm.restaurants = restaurants;

                })}).error(function (err) {

            });
        }
        init();

        function gotoEdit(restId) {

            userService
                .setRestaurantId(restId)
                .then(function () {
                    $location.url('/user/restaurant/edit');
                })




        }
        //
        // function editRestaurant(restId) {
        //     userService
        //         .findRestaurantById(restId)
        //         .success(function (restaurant) {
        //             if(ownerId == restaurant.ownerId) {
        //                 $location.url('/user/restaurant/edit');
        //             }
        //
        //         })
        // }

        function logout() {

            userService
                .logout()
                .then(function () {
                    $location.url('/home');
                });
        }

    }
})();