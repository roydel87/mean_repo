angular.module('pokeApp.loginCtrl',[])
.controller('loginCtrl',function(authServices,$location){
  var vm = this;
  vm.message = "Este es el login";

  vm.username = '';
  vm.password = '';

  vm.login = function(){
    authServices.login(vm.username,vm.password).then(function(response){
      $location.path('/users')
    
    })
  }


})
