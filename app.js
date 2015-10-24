// librarie angular route qui permet (entre autre)
// de configurer les routes en les associant de
// manière claire à des controlleurs et des vues
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

// configuration de l'application
angular.module("baltapants", ["ngRoute"])
  .config(config)
  .controller("mainCtrl", mainCtrl)