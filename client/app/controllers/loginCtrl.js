app.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$cookieStore', function ($scope, $rootScope, $location, AuthenticationService, $cookieStore) {
        
    // Limpiamos las credenciales    
    AuthenticationService.ClearCredentials();

    // Realizamos la llamada al servicio para hacer login en la aplicación
    $scope.login = function () {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function(response) {
            if(response) {
                AuthenticationService.SetCredentials($scope.username, $scope.password);
                $rootScope.globals = $cookieStore.get('globals') || {};
                $rootScope.globals.currentUser.userInfo = response;
                $cookieStore.put('globals', $rootScope.globals);
                $location.path('/');
            } else {
                $scope.error = response.message;
                $scope.dataLoading = false;
            }
        });
    };

    }]);