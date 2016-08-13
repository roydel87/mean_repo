angular.module('pokeApp.userServices',[])
.service('User',function($http,$q){
  var _users = undefined;
  var _user = undefined;
  this.all = function(){
    if(!_users){
      var deferred = $q.defer();

      $http.get("/api/users")
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(response){
          deferred.reject(response);
        })

      _users = deferred.promise;
  }
  return _users;
}

this.get = function(id){
  if(!_user){
    var deferred = $q.defer();
    $http.get("/api/users/" + id)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(response){
        deferred.reject(response);
      })
      _user = deferred.promise;
  }
  return _user;
}

this.create = function(name,username,password){
  var data = {
    'name' : name,
    'username' : username,
    'password' : password
  };
  var deferred = $q.defer();
  $http.post("/api/users",data)
    .success(function(response){
      deferred.resolve(response);
    })
    .error(function(response){
      deferred.reject(response);
    })
    _user = deferred.promise;
    return _user;
}

this.update = function(id,name,username){
  var data = {
    'name' : name,
    'username' : username
  };
  var deferred = $q.defer();
  $http.put("/api/users/" + id,data)
    .success(function(response){
      deferred.resolve(response);
    })
    .error(function(response){
      deferred.reject(response);
    })
    _user = deferred.promise;
    return _user;
}

this.delete = function(id){
  var deferred = $q.defer();
  $http.delete("http://localhost:5000/api/users/" + id)
    .success(function(response){
      deferred.resolve(response);
    })
    .error(function(response){
      deferred.reject(response);
    })
    _user = deferred.promise;
    return _user;
}

})
