app.controller('testCtrl', ['$scope', '$http', '$routeParams', '$timeout', '$mdSidenav', '$mdToast', function($scope, $http, $routeParams, $timeout, $mdSidenav, $mdToast) {


  $scope.showSimpleToast = function() {

    $scope.amService.ToastSimple("hola");
  };

    function inicializar() {
    }

    inicializar();
}]);