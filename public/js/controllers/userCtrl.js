angular.module('pokeApp.userCtrl',[])
.controller('userCtrl',function(User,LxDialogService, LxNotificationService){
  var vm = this;
  vm.message = "Este es el admin de usuario";
  vm.dialogId = 'dialog-user';
  vm.showPassword = false;
  vm.id='undefined';
  vm.name = '';
  vm.username = '';
  vm.password = '';
  User.all().then(function(response){
      vm.users = response;
  });

  vm.openCreateDialog = function(){
    vm.showPassword = true;
    vm.openDialog();
  }

  vm.getAllUsers = function(){
    User.all().then(function(response){
        vm.users = response;
    });
  }

  vm.getUser = function(id){
    vm.id = id;
    vm.showPassword = false;
    User.get(vm.id).then(function(response){
      vm.usuario = response;
    });
    vm.openDialog();
  }

  vm.deleteUser = function(id){
    vm.id = id;
    User.delete(vm.id).then(function(response){
      vm.getAllUsers();
    })
  }

  vm.updateUser = function(){
    User.update(vm.usuario._id,vm.usuario.name,vm.usuario.username).then(function(response){
      console.log(response);
    })
  }

  vm.createUser = function(){
    User.create(vm.usuario.name,vm.usuario.username,vm.usuario.password).then(function(response){
      console.log(response);
    })
  }

  vm.openDialog = function(){
    LxDialogService.open(vm.dialogId);
  };
})
