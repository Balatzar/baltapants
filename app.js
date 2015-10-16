function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "views/main.html",
      controller: "mainCtrl"
    })
    .otherwise({
      redirectTo: '/'
    });
}

angular.module("baltapants", ["ngRoute"])
  .config(config)
  .controller("mainCtrl", mainCtrl)