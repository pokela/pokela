app.controller('registroCtrl', ['$scope', '$rootScope', '$location', '$http', 'AuthenticationService', function ($scope, $rootScope, $location, $http, AuthenticationService) {
        
    $scope.registrarse = function() {

        componerFecha();

        $http.post($scope.serverUrl + "api/usuarios/", $scope.registro).then(function(response) {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.registro.usuario, $scope.registro.password, function(res) {
                if(res) {
                    AuthenticationService.SetCredentials($scope.registro.usuario, $scope.registro.password);
                    $location.path('/');
                } else {
                    $scope.error = res.message;
                    $scope.dataLoading = false;
                }
            });
        }, function (error) {
            alert(error);
        });
    }

    function validaciones() {

    }

    function componerFecha() {
        var fecha = $scope.fecha.dia + '-' + $scope.fecha.mes + '-' + $scope.fecha.anyo;
        $scope.registro.fechaNacimiento = moment(fecha);
    }

    function inicializar() {
        $scope.fecha = { dia: null, mes: null, anyo: null};
        $scope.registro = new Usuario();
    }

    inicializar();


    }]);