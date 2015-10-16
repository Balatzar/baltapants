function mainCtrl($scope, $http) {
  $scope.title = "Où va Balthazar ?";
  var image = document.querySelector("img");
  
  $scope.sendForm = function() {
     var location = $scope.form;
    $http({
      method: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&APPID=39583154fb47ae5a44360b9c46bb99d2"
    }).then(function sucess(res) {
      updateDom(res.data);
      $scope.form = "";
    }, function fail(res) {
      console.log("Error in get in sendForm : " + res);
    });
  }
  
  function updateDom(data) {
    $scope.title = data.name;
    var temp = Math.round(data.main.temp)
    if (temp <= 0)
      pants(temp);
    else
      shorts(temp);
    $scope.temp = temp;
  }
  
  function pants(temp) {
    var pant = {
      0: "http://i.imgur.com/q4zJNNK.jpg",
      1: "http://i.imgur.com/PYDPZtE.jpg",
      2: "http://i.imgur.com/FrQ2SZ0.jpg",
      3: "http://i.imgur.com/l2V32WH.jpg"
    };
    
    image.src = pant[-temp % size(pant)];
    $scope.short = "Il fait trop froid gros";
  }
  
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
  
  size = function(obj) {
    var size = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) 
          size++;
    }
    return size;
  };
}