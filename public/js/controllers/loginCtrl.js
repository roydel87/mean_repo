angular.module('pokeApp.loginCtrl',[])
.controller('loginCtrl',function(authServices){
  var vm = this;
  vm.message = "Este es el login";

  vm.username = '';
  vm.password = '';

  vm.login = function(){
    console.log(vm.username);
    console.log(vm.password);
    authServices.login(vm.username,vm.password).then(function(response){
      console.log(response);
    })
  }


})
