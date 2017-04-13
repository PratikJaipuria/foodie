(function (){
    angular
        .module("ProjectMaker")
        .controller("newMenuController",newMenuController);

    function newMenuController($routeParams,menuService,userService, $location){
        var vm = this;
        var userId //= $routeParams['uid'];
        //var restaurantId = $routeParams['rst'];
        var menu;
        vm.menu='';

        // vm.userId = userId;
        //vm.restaurantId = restaurantId;

        vm.createMenu = createMenu;
        var restaurantId;

        function init() {


            var promise=userService.findCurrentUser();
            promise.success(function (user) {
                vm.user=user;
                vm.userId = user._id;
                userId = user._id;}).error(function () {

                userService
                    .getRestaurantId()
                    .success(function (restaurantId) {
                        vm.restaurantId = restaurantId;
                        restaurantId = restaurantId.replace(/"/g, '');

                    });

            })


        }
        init();

        function createMenu(menu) {
            userService
                .getRestaurantId()
                .success(function (restaurantId) {
                    vm.restaurantId = restaurantId;
                    restaurantId = restaurantId.replace(/"/g, '');

                    // console.log("REST ID",restaurantId);
                    menu.restaurantId = restaurantId;
                    console.log(menu);
                    // menu.restaurantId = restaurantId;
                    menuService
                        .createMenu(menu)
                        .success(function (res) {
                            $location.url("/user/restaurant/menu");
                        }).error(function (err) {
                        // throwError(errors);
                    });})

        }
    }})();

