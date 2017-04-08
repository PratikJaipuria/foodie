/**
 * Created by Pratik on 3/31/2017.
 */
(function () {
    angular
        .module("ProjectMaker")
        .controller("restaurantListController", restaurantListController);

    function restaurantListController($location,$routeParams, restaurantService,userService) {
        var vm = this;

        var ownerId = $routeParams.uid;
        vm.ownerId = ownerId;

        vm.logout = logout;

        function init() {
            restaurantService
                .findRestaurantByOwner(ownerId)
                .success(function (restaurants) {
                    vm.restaurants = restaurants;

                })
        }
        init();

        function logout() {

            userService
                .logout()
                .then(function () {
                    $location.url('/home');
                });
        }

    }
})();