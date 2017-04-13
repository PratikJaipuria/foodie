(function(){
    angular
        .module("ProjectMaker")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/",{
                templateUrl: "views/home.html",
                controller:'homeController',
                controllerAs:'model'

            })
            .when("default",{
                templateUrl: "views/home.html",
                controller:'homeController',
                controllerAs:'model'
            })

            .when("/home",{
                templateUrl: "views/home.html",
                controller:'homeController',
                controllerAs:'model'
            })


            .when("/admin",{
                templateUrl: "views/users/templates/admin-dashboard.view.client.html",
                controller:'adminDashboardController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLogin
                }

            })


            .when("/admin/edit/:uid",{

                templateUrl: "views/users/templates/admin-edit-user.view.client.html",
                controller: "adminEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })



            .when("/login",{
                templateUrl: "views/users/templates/login.html",
                controller: "userLoginController",
                controllerAs: "model"})

            .when("/searchResult/name/:rn/address/:add",{
                templateUrl: "views/users/templates/user.search.result.html",
                controller: "searchResultController",
                controllerAs: "model"})


            .when("/searchResult/address/:add",{
                templateUrl: "views/users/templates/user.search.result.html",
                controller: "searchResultController",
                controllerAs: "model"})


            .when("/user/searchResult/name/:rn/address/:add",{
                templateUrl: "views/users/templates/user.search.result.html",
                controller: "searchResultController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }})


            .when("/user/searchResult/address/:add",{
                templateUrl: "views/users/templates/user.search.result.html",
                controller: "searchResultController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }})


            .when("/user/searchResult",{
                templateUrl: "views/home.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })


            .when("/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl: "views/restaurant/templates/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model"})


            .when("/searchResult/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/restaurant/templates/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model"})


            .when("/user/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl: "views/restaurant/templates/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }})


            .when("/user/searchResult/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/restaurant/templates/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }})



            .when("/searchResult/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/restaurant/templates/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model"})

            .when("/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/restaurant/templates/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model"})


            .when("/user/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu/cart",{
                templateUrl:"views/order/templates/user.checkout.html",
                controller: "checkOutController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }})

            .when("/user/searchResult/address/:add/restaurant/:rid/:rname/menu/cart",{
                templateUrl:"views/order/templates/user.checkout.html",
                controller: "checkOutController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }})


            .when("/user/restaurant/order",{
                templateUrl: "views/order/templates/resturant.order.tracking.html",
                controller: 'restaurantOrderTrackController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLogin
                }})


            .when("/register/:role",{
                templateUrl: "views/users/templates/userRegister.html",
                controller: "userRegisterController",
                controllerAs:'model'
            })

            .when("/register-owner",{
                templateUrl: "views/owner/templates/ownerRegister.html",
                controller: "ownerRegisterController"
            })


            .when("/user/profile",{
                templateUrl: "views/users/templates/userProfile.html",
                controller: "userProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            .when("/user/restaurant",{
                templateUrl: "views/restaurant/templates/restaurantList.html",
                controller: "restaurantListController",
                controllerAs:"model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            .when("/user/restaurant/new",{
                templateUrl: "views/restaurant/templates/newRestaurant.html",
                controller: "restaurantNewController",
                controllerAs:"model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            .when("/user/restaurant/edit",{
                templateUrl: "views/restaurant/templates/restaurantEdit.html",
                controller: "restaurantEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                    // currentRestaurant:checkRestaurant
                }
            })

            .when("/user/restaurant/menu/item",{
                templateUrl: "views/restaurant/templates/menuItemEdit.html",
                controller: "editMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            .when("/user/restaurant/menu/category/:catname",{
                templateUrl: "views/restaurant/templates/menuCategoryEdit.html",
                controller: "editMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            .when("/user/restaurant/menu",{
                templateUrl: "views/restaurant/templates/restaurantMenu.html",
                controller: "restaurantMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            .when("/user/restaurant/menu/new",{
                templateUrl: "views/restaurant/templates/newMenu.html",
                controller: "newMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            .when("/user/restaurant/db",{
                templateUrl: "views/users/templates/deliveryPersonnalList.html",
                controller: "deliveryBoyListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            .when("/user/restaurant/db/:role",{
                templateUrl: "views/users/templates/userRegister.html",
                controller: "deliveryBoyRegisterController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            //change this to profile standard path
            .when("/user/restaurant/editdb",{
                ///deliveryPersonnal/:db
                templateUrl: "views/users/templates/dbProfileforOwner.html",
                controller: "deliveryBoyProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })

            .when("/user/orders",{

                templateUrl: "views/users/templates/user.order.view.html",
                controller: "userOrderController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })



            .when("/user/dborders",{

                templateUrl: "views/order/templates/deliveryPersonnalOrder.html",
                controller: "deliveryPersonnalOrderController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            });

    }

    function checkLogin($q, userService, $location) {
        var deffered = $q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if(user == '0') {
                    deffered.reject();
                    $location.url('/login')
                } else {
                    deffered.resolve(user);
                }
            });
        return deffered.promise;
    }

    function checkRestaurant($q,userService,restaurantService,$location) {
        var deferred = $q.defer();
        // userService
        var restaurantId = this.location.href.split('/')[this.location.href.split('/').length -1];
        // var restaurantId = $routeParams['rst'];
        // console.log("REST ID in config",restaurantId);
        // console.log("USER ID in config",user);
        restaurantService
            .findRestaurantById(restaurantId)
            .success(function (restaurant) {
                // console.log("REST obje ct",restaurant);
                userService
                    .loggedin()
                    .then(function (user) {
                        // console.log("USER object",user);
                        if(user._id == restaurant.ownerId) {
                            deferred.resolve();

                        } else {
                            // deferred.resolve(restaurant);
                            deferred.reject();
                            $location.url('/login');
                            // $location.url('/user/restaurant/'+restaurantId);

                        }
                    });
                return deferred.promise;
            })
    }



})();