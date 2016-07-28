angular.module('myApp.controllers',[])
.controller('mainCtrl',function($scope,$filter, cityService){
  $scope.message = "La aplicacion ha sido creada";

  $scope.name = "Roy Delgado";

  $scope.toLowerCase = $filter('lowercase')($scope.name);
  $scope.isCapitalized = function(str){
    return str[0] == str[0].toUpperCase();
  }

  $scope.cities = [
    {'abr': 'LI',
     'name': 'Lima'},
    {'abr': 'NY',
     'name': 'New York'},
    {'abr': 'BA',
     'name': 'Buenos Aires'},
    {'abr': 'CUS',
     'name': 'Cusco'},
    {'abr': 'RJ',
     'name': 'Rio de Janeiro'},
    {'abr': 'CA',
     'name': 'Caracas'},
    {'abr': 'MA',
     'name': 'Madrid'},
    {'abr': 'LO',
     'name': 'Londres'},
    {'abr': 'SFO',
     'name': 'San Francisco'},
    {'abr': 'BO',
     'name': 'Bogota'}];

  var searchCity = function(abr){
    console.log(cityService.getCityName(abr));
  }
  $scope.showCityName = function(abr){
    searchCity(abr);
  }

  console.log(cityService.getcity('SFO'));

  console.log($scope.message);
})
.controller('clockCtrl',function($scope){
  $scope.clock = {
    now: new Date()
  }

  var updateClock = function(){
    $scope.clock.now = new Date();
  }

  $scope.changeClock = function(){
    updateClock();
  }

  setInterval(function(){
    $scope.$apply(updateClock);
  },1000)
})
