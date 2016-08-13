angular.module('pokeApp.pokemonServices',[])
.service('pokemonServices',function($http,$q){
  var _pokemons = undefined;
  var _pokemon = undefined;
  this.getPokemons = function(){
    if(!_pokemons){
      var deferred = $q.defer();

      //$http.get("bd_pokemon/pokemons.json")
      $http.get("/api/pokemons")
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(response){
          deferred.reject(response);
        })

      _pokemons = deferred.promise;
    }
    return _pokemons;
  }
  this.setPokemons = function(pokemons){
    _pokemons = pokemons;
  }
  this.get = function(id){
    if(!_pokemon){
      var deferred = $q.defer();
      $http.get("/api/pokemons/" + id)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(response){
          deferred.reject(response);
        })
        _pokemon = deferred.promise;
    }
    return _pokemon;
  }
  this.create = function(){

  }
  this.put = function(){

  }
  this.delete = function(id){
    var deferred = $q.defer();
    $http.delete("/api/pokemons/" + id)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(response){
        deferred.reject(response);
      })
      _pokemon = deferred.promise;
      return _pokemon;
  }
})
