/**
 * Created by Pratik on 4/1/2017.
 */
(function (){
    angular.module('ProjectMaker')
        .controller('deliveryBoyProfileController', deliveryBoyProfileController);

    function deliveryBoyProfileController ($location, userService, $timeout, $routeParams, addressAPISearchService) {

        var vm = this;
        var userId = $routeParams['uid'];
        var restaurantId = $routeParams['rst'];
        var dbId = $routeParams['dbid'];
        vm.countries=['United States'];
        vm.states=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",];




        vm.loadAddressFromAPI=loadAddressFromAPI;
        vm.populateCityAndStateIfDlSel=populateCityAndStateIfDlSel;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        function init () {
            var promise=userService.findUserByID(dbId);
            promise.success(function (dbUser) {
                vm.user=dbUser;


            }).error(function (err) {

            })
        } init();


        function loadAddressFromAPI() {

            if(vm.user.address){
                var formattedSpace=vm.user.address.replace(/\s+/g,'+');
                var formatedSpaceAndPound=formattedSpace.replace(/#/g, '%23');

                var promise=addressAPISearchService.autoCompleteAddress(formatedSpaceAndPound);
                promise.success(function (addr) {
                    vm.addressFromAPI=addr.suggestions;

                }).error(function (err) {
                    vm.error=err;
                })
            }

        }

        function populateCityAndStateIfDlSel() {

            if (vm.addressFromAPI){
                var cityAndState=vm.addressFromAPI[0].text.split(', ')[1].split(' ');
                vm.user.city=cityAndState[0];
                vm.user.state=cityAndState[1];


            }

            else{
                vm.user.city='';
                vm.user.state='';
            }


        }


        function updateUser(dbId, user) {
            var errors=[];
            var error='';

            if(!user.firstName){
                error="FirstName is invalid";
                errors.push(error);
            }

            if(!user.lastName){
                error="LastName is invalid";
                errors.push(error);
            }

            if(!user.phone){
                error="Phone is invalid";
                errors.push(error);
            }

            if(!user.pin){
                error="PIN is invalid";
                errors.push(error);
            }

            if(!user.address){
                error="Address is invalid";
                errors.push(error);
            }

            if(!user.city){
                error="City is invalid";
                errors.push(error);
            }

            if(errors.length == 0){
                var promise=userService.updateUser(dbId,user);
                promise.success(function (user) {
                    vm.user=user;
                    outputMsg("SUCCESS","Profile updated successfully");
                    $location.url("/user/"+userId+"/restaurant/"+restaurantId+"/db");
                }).error(function (err) {
                    error="unable to update User";
                    errors.push(error);
                    outputMsg("ERROR",errors);
                })
            }
            else {
                outputMsg("ERROR",errors);
            }


        }

        function deleteUser(dbId) {
            var promise=userService.deleteUser(dbId);
            promise.success(function (response) {
                $location.url("/user/"+userId+"/restaurant/"+restaurantId+"/db");
            }).error(function (err) {
                vm.error("unable to delete User");
            })
        }

        function outputMsg(msgType,msg){
            if(msgType=='SUCCESS'){
                vm.message=msg;
            }
            else{
                vm.error=msg;
            }
            $timeout(clearMessage, 5000);
        }

        function clearMessage() {
            vm.error='';
            vm.message='';
        }


    }

})();