function mainCtrl($scope, $http) {
  // à l'arrivée de l'utilisateur, le titre de la page est celui-ci
  $scope.title = "Où va Balthazar ?";
  // on stocke l'élément html 'img' dans une variable pour pouvoir
  // le manipuler par la suite (changer son attribut 'src' pour changer l'image)
  var image = document.querySelector("img");
  
  // fonction qui permet de faire la requête (query) a open weather
  $scope.sendForm = function() {
    // on récupère la data entrée par l'utilisateur quand il clique sur le bouton
    var location = $scope.form;
    // et on fait la requête
    $http({
      // c'est une requête de type GET
      method: "GET",
      // url de l'api open weather avec l'endroit que l'utilsiateur a entré
      // (l'opérateur + est utilisé ici pour concatener c'est à dire coller les strings)
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&APPID=39583154fb47ae5a44360b9c46bb99d2"
      // quand la requête est finie une promese est appellée avec en argument la
      // data renvoyée par la requête
      }).then(function sucess(res) {
        // on appelle la fonction update dom en passant uniquement la data qui
        // nous interesse (pas les status et autres informations contenues par
        // res)
        updateDom(res.data);
        // on vide le formulaire
        $scope.form = "";
        // fonction invoquée en cas d'erreur de la requête
      }, function fail(res) {
        console.log("Error in sendForm : " + res);
      });
  }
  
  // fonction qui va updater notre vue en fonction de la data renvoyée par
  // la requête
  function updateDom(data) {
    // on change le titre avec le nom de la ville bien écrit
    $scope.title = data.name;
    // on stocke la température arrondie
    var temp = Math.round(data.main.temp)
    // si elle est de 0 ou moins
    if (temp <= 0)
      // on appelle la fonction pants avec en paramètre notre température
      pants(temp);
    // sinon
    else
      // on appelle la fonction shorts
      shorts(temp);
    // et on fini par afficher la température dans la vue
    $scope.temp = temp;
  }
  
  // fonction en cas de froideur extreme
  function pants(temp) {
    // création d'un tableau contenant plusieurs images de pantalons
    var pant = {
      0: "http://i.imgur.com/q4zJNNK.jpg",
      1: "http://i.imgur.com/PYDPZtE.jpg",
      2: "http://i.imgur.com/FrQ2SZ0.jpg",
      3: "http://i.imgur.com/l2V32WH.jpg"
    };
    // on update l'élément img dans la vue avec une url choisie par rapport
    // à la température qu'il fait (pour afficher différents pantalons selon
    // la température)
    image.src = pant[-temp % size(pant)];
    $scope.short = "Il fait trop froid gros";
  }
  
  // meme fonction que pants mais avec des shorts
  function shorts(temp) {
    var short = {
      0: "http://i.imgur.com/523dKVl.gif",
      1: "http://i.imgur.com/eFPuFRE.jpg",
      2: "http://i.imgur.com/qZbWjMY.jpg",
      3: "http://i.imgur.com/xzQ951j.jpg",
      4: "http://i.imgur.com/Or9Cqow.jpg"
    }
    
    image.src = short[temp % size(short)];
    $scope.short = "Les shorts c'est la base";
  }
  
  // fonction permettant de calculer la taille d'un objet (on ne peut pas
  // utiliser la propriété .length comme avec les array)
  size = function(obj) {
    var size = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) 
          size++;
    }
    return size;
  };
}