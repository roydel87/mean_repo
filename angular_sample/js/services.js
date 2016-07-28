angular.module('myApp.services',[])
.service('cityService',function($filter){
  this.getcity = function(abr){
    //buscar la ciudad
    return "San Francisco";
  }

  this.getCityName = function(abreviaton){
    var cityList =
    [
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

       var cty = $filter('filter')(cityList,{abr:abreviaton},true);
       return cty[0].name;
    
  }
})
