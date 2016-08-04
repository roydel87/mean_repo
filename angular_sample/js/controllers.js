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

  //console.log(cityService.getcity('SFO'));

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
.controller('citiesCtrl', function($scope, cityService) {
      $scope.cities = cityService.getCities();

      $scope.myLink = "http://google.com";

      $scope.fields =[
        {placeholder: 'abbr', isRequired:true},
        {placeholder: 'name', isRequired:true}
      ];

      $scope.searchCity = function(cityAbbr){
        $scope.oneCity = cityService.getCity(cityAbbr)[0];
      }

      $scope.filtrarCities = function(cityAbbr){
        $scope.cities = cityService.getCity(cityAbbr);
      }

      $scope.multiplicar = function (){
        $scope.result = Number($scope.myNumber)*5;
      }
      $scope.generateNumber = function(){
        return (Math.floor(Math.random()*10)+1);
      }
});
