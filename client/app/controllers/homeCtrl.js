app.controller('homeCtrl', ['$scope', '$rootScope', 'amService', function ($scope, $rootScope, amService) {
    $rootScope.serverUrl = "http://ec2-54-89-22-106.compute-1.amazonaws.com:4000/";//Desarrollo
    $rootScope.serverUrl = "http://localhost:4000/";//Local
    $rootScope.amService = amService;
}]);