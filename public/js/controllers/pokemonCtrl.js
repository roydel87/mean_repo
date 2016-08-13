angular.module('pokeApp.pokemonCtrl',[])
.controller('pokemonCtrl',function(pokemonServices, LxDialogService, LxNotificationService,$filter){
  var vm = this;
  vm.message = "Este es el admin de pokemon";
  vm.dialogId = 'dialog-pokemon';
  vm.showCard = true;

 vm.getPokemonById = function(id){
    var item = $filter('filter')(vm.Pokemons,{id:id},true);
    vm.showCard = true;
    vm.openDialog();
    vm.pokeById = item[0];
 }

 vm.openCreateDialog = function(){
   vm.showCard = false;
   vm.openDialog();
 }

  vm.openDialog = function(){
    LxDialogService.open(vm.dialogId);
  };
  pokemonServices.getPokemons().then(function(response){
      vm.Pokemons = response;
  });

  vm.createPokemon = function(){
    var data = {
      'name' : vm.pokeById.name,
      'type' : vm.pokeById.type
    }
    pokemonServices.create(data).then(function(response){
      console.log(response);
    })
  }


})
