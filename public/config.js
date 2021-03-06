(function(){
    angular
        .module("ProjectMaker")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/",{
                templateUrl: "views/users/templates/home.view.html",
                controller:'homeController',
                controllerAs:'model',
                data:{
                    pageTitle:'Home'
                }

            })
            .when("default",{
                templateUrl: "views/users/templates/home.view.html",
                controller:'homeController',
                controllerAs:'model',
                data:{
                    pageTitle:'Home'
                }
            })

            .when("/home",{
                templateUrl: "views/users/templates/home.view.html",
                controller:'homeController',
                controllerAs:'model',
                data:{
                    pageTitle:'Home'
                }
            })


            .when("/admin",{
                templateUrl: "views/users/templates/admin-dashboard.view.html",
                controller:'adminDashboardController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Dashboard'
                }

            })


            .when("/admin/edit/:uid",{

                templateUrl: "views/users/templates/admin-edit.view.html",
                controller: "adminEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'EditUser'
                }
            })



            .when("/login",{
                templateUrl: "views/users/templates/login.view.html",
                controller: "userLoginController",
                controllerAs: "model",
                data:{
                    pageTitle:'Login'
                }})

            .when("/searchResult/name/:rn/address/:add",{
                templateUrl: "views/users/templates/user-search-restaurant.view.html",
                controller: "searchResultController",
                controllerAs: "model",
                data:{
                    pageTitle:'Restaurants'
                }})


            .when("/searchResult/address/:add",{
                templateUrl: "views/users/templates/user-search-restaurant.view.html",
                controller: "searchResultController",
                controllerAs: "model",
                data:{
                    pageTitle:'Restaurants'
                }})


            .when("/user/searchResult/name/:rn/address/:add",{
                templateUrl: "views/users/templates/user-search-restaurant.view.html",
                controller: "searchResultController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Restaurants'
                }})


            .when("/user/searchResult/address/:add",{
                templateUrl: "views/users/templates/user-search-restaurant.view.html",
                controller: "searchResultController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Restaurants'
                }})


            .when("/user/searchResult",{
                templateUrl: "views/users/templates/home.view.html",
                controller: "homeController",
                controllerAs: "model",
                data:{
                    pageTitle:'Home'
                },

                resolve: {
                    currentUser: checkLogin
                }
            })


            .when("/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl: "views/restaurant/templates/user-search-restaurant-menu.view.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model",
                data:{
                    pageTitle:'Menu'
                }})


            .when("/searchResult/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/restaurant/templates/user-search-restaurant-menu.view.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model",
                data:{
                    pageTitle:'Menu'
                }})


            .when("/user/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl: "views/restaurant/templates/user-search-restaurant-menu.view.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Menu'
                }})


            .when("/user/searchResult/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/restaurant/templates/user-search-restaurant-menu.view.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Menu'
                }})



            .when("/searchResult/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/restaurant/templates/user-search-restaurant-menu.view.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model",
                data:{
                    pageTitle:'Menu'
                }})

            .when("/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/restaurant/templates/user-search-restaurant-menu.view.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model",
                data:{
                    pageTitle:'Menu'
                }})


            .when("/user/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu/cart",{
                templateUrl:"views/order/templates/user-create-order.view.html",
                controller: "checkOutController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'CheckOut'
                }})

            .when("/user/searchResult/address/:add/restaurant/:rid/:rname/menu/cart",{
                templateUrl:"views/order/templates/user-create-order.view.html",
                controller: "checkOutController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'CheckOut'
                }})


            .when("/user/restaurant/order",{
                templateUrl: "views/order/templates/resturant-order-list.view.html",
                controller: 'restaurantOrderTrackController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Orders'
                }})


            .when("/register/:role",{
                templateUrl: "views/users/templates/user-register.view.html",
                controller: "userRegisterController",
                controllerAs:'model',
                data:{
                    pageTitle:'UserRegister'
                }
            })



            .when("/user/profile",{
                templateUrl: "views/users/templates/user-profile.view.html",
                controller: "userProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Profile'
                }
            })

            .when("/user/restaurant",{
                templateUrl: "views/restaurant/templates/restaurant-list.view.html",
                controller: "restaurantListController",
                controllerAs:"model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Restaurants'
                }
            })

            .when("/user/restaurant/new",{
                templateUrl: "views/restaurant/templates/restaurant-new.view.html",
                controller: "restaurantNewController",
                controllerAs:"model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'NewRestaurant'
                }
            })

            .when("/user/restaurant/edit",{
                templateUrl: "views/restaurant/templates/restaurant-edit.view.html",
                controller: "restaurantEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin

                },
                data:{
                    pageTitle:'EditRestaurant'
                }
            })

            .when("/user/restaurant/menu/item",{
                templateUrl: "views/restaurant/templates/menu-item-edit.view.html",
                controller: "editMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'EditMenu'
                }
            })

            .when("/user/restaurant/menu/category/:catname",{
                templateUrl: "views/restaurant/templates/menu-category-edit.view.html",
                controller: "editMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'EditCategory'
                }
            })

            .when("/user/restaurant/menu",{
                templateUrl: "views/restaurant/templates/restaurant-menu-list.view.html",
                controller: "restaurantMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Menus'
                }
            })

            .when("/user/restaurant/menu/new",{
                templateUrl: "views/restaurant/templates/menu-new.view.html",
                controller: "newMenuController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'NewMenu'
                }
            })

            .when("/user/restaurant/db",{
                templateUrl: "views/users/templates/db-list.view.html",
                controller: "deliveryBoyListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'DeliveryBoys'
                }
            })

            .when("/user/restaurant/db/:role",{
                templateUrl: "views/users/templates/user-register.view.html",
                controller: "deliveryBoyRegisterController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'DeliveryBoyRegister'
                }
            })


            .when("/user/restaurant/editdb",{

                templateUrl: "views/users/templates/db-profile-owner.view.html",
                controller: "deliveryBoyProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'DeliveryBoyProfile'
                }
            })

            .when("/user/orders",{

                templateUrl: "views/order/templates/user-order-list.view.html",
                controller: "userOrderController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Orders'
                }
            })



            .when("/user/dborders",{

                templateUrl: "views/order/templates/db-order-list.view.html",
                controller: "deliveryPersonnalOrderController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                },
                data:{
                    pageTitle:'Orders'
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
        var restaurantId = this.location.href.split('/')[this.location.href.split('/').length -1];

        restaurantService
            .findRestaurantById(restaurantId)
            .success(function (restaurant) {

                userService
                    .loggedin()
                    .then(function (user) {

                        if(user._id == restaurant.ownerId) {
                            deferred.resolve();

                        } else {

                            deferred.reject();
                            $location.url('/login');


                        }
                    });
                return deferred.promise;
            })
    }



})();