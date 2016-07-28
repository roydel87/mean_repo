angular.module('myApp.directives',[])
  .directive('rdhattr',function(){
    return {
      restrict: 'A',
      template: '<h1> Directiva attribute</h1>'
    }
  })
  .directive('rdhelem',function(){
    return {
      restrict: 'E',
      template: '<h1> Directiva element</h1>'
    }
  })
  .directive('clock',function(){
    return{
      restrict: 'AE',
      templateUrl: '/angular_sample/js/clock.html'
    }
  })
