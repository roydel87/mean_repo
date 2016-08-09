angular.module('pokeApp.pokemonCtrl',[])
.controller('pokemonCtrl',function(pokemonServices, LxDialogService, LxNotificationService,$filter){
  var vm = this;
  vm.message = "Este es el admin de pokemon";
  vm.dialogId = 'dialog-pokemon';


 vm.getPokemonById = function(id){
    var item = $filter('filter')(vm.Pokemons,{id:id},true);
    vm.openDialog();
    vm.pokeById = item[0];
 }

  vm.openDialog = function(){
    LxDialogService.open(vm.dialogId);
  };
  pokemonServices.getPokemons().then(function(response){
      vm.Pokemons = response;
  });


})
