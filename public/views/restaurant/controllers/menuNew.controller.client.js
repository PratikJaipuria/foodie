(function (){
    angular
        .module("ProjectMaker")
        .controller("newMenuController",newMenuController);

    function newMenuController($routeParams,menuService,userService, $location){
        var vm = this;
        var userId //= $routeParams['uid'];
        var restaurantId = $routeParams['rst'];
        var menu;
        vm.menu='';

        // vm.userId = userId;
        vm.restaurantId = restaurantId;


        vm.createMenu = createMenu;

        function init() {

            // console.log(restaurantId);
            var promise=userService.findCurrentUser();
            promise.success(function (user) {
                vm.user=user;
                vm.userId = user._id;
                userId = user._id;}).error(function () {

            });



            }
        init();

        function createMenu(menu) {
            menu.restaurantId = restaurantId;
            // console.log(menu);
            menu.restaurantId = restaurantId;
            menuService
                .createMenu(menu)
                .success(function (res) {
                    $location.url("/user/restaurant/"+restaurantId+"/menu");
                }).error(function (err) {
                // throwError(errors);
            });

    }
}})();
