/**
 * Created by Pratik on 3/31/2017.
 */
(function (){
    angular.module('ProjectMaker')
        .controller('deliveryBoyListController', deliveryBoyListController);

    function deliveryBoyListController ($location, userService, $timeout, $routeParams) {
        var vm = this;
        // var userId //= $routeParams.uid;
        var restaurantId = $routeParams.rst;
        // vm.userId = userId;
        vm.restaurantId = restaurantId;

        function init() {

            // var promise=userService.findCurrentUser();
            // promise.success(function (user) {
            //     vm.user=user;
            //     vm.userId = user._id;
            //     userId = user._id;

            userService
                .findDeliveryBoyByRestaurant(restaurantId)
                .success(function (dbs) {

                    console.log("LIST of Delivery Boys Controller", dbs);
                    vm.dbs = dbs;

                })
        }

        init();

    }
    }) ();
